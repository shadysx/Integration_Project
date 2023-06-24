import { Helper } from "../Helpers/Helper";
import React, {useContext} from 'react';
import { Reservation } from "../Interfaces/Interface";
import { UserService } from "./UserService";
import moment from 'moment';
import { AuthContext } from "../contexts/AuthContext";



export class ReservationService
{    

  FetchReservations = async () => {
    let response = await fetch("http://localhost:8000/api/reservations");
    let reservations: Reservation[] = await response.json();
  
    let retVal: Reservation[] = [];
  
    for (const res of reservations) {
      let user1Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user1_id);
      let user2Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user2_id);
      let user3Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user3_id);
      let user4Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user4_id);
      let courtNumber = await Helper.ConvertCourtIdToNumber(res.court_id)
  
      res.user1_name = user1Name;
      res.user2_name = user2Name;
      res.user3_name = user3Name;
      res.user4_name = user4Name;
      res.court_number = courtNumber;

      retVal.push(res);
    }
  
    console.log('reservations after fetch', retVal);
    return retVal;
  }

  CanUserBookThisReservation = async (userId: number, proposedReservation: Reservation): Promise<boolean> => {
    // Fetch all reservations
    let reservations = await this.FetchReservations();
    
    // Filter the reservations for the given user ID
    reservations = reservations.filter(
      res => 
      res.user1_id === userId || 
      res.user2_id === userId || 
      res.user3_id === userId || 
      res.user4_id === userId
    );
  
    // Get the current date and time at the start of the week (Sunday at 00:00:00)
    let now = new Date();
    let startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  
    // Filter the reservations to only include those from the current week
    reservations = reservations.filter(reservation => new Date(reservation.date) >= startOfWeek);

    console.log("RESERVATIONS FROM THE CURRENT WEEK FOR ALL USERS", reservations)
  
    // Calculate the total reservation hours for singles and doubles
    let totalHoursSingles = 0;
    let totalHoursDoubles = 0;
  
    for (const reservation of reservations) {
      // Calculate the reservation duration
      let duration = moment.duration(moment(reservation.ending_hour, 'HH:mm:ss').diff(moment(reservation.starting_hour, 'HH:mm:ss'))).asHours();
      
      console.log("DURATION", duration)
      if (reservation.user3_id || reservation.user4_id) {
        // This is a doubles reservation
        totalHoursDoubles += duration;
      } else {
        // This is a singles reservation
        totalHoursSingles += duration;
      }
    }

    console.log("TOTAL DOUBLE, SIMPLE", totalHoursDoubles, totalHoursSingles)
  
    // Calculate the proposed reservation duration
    let proposedDuration = moment.duration(moment(proposedReservation.ending_hour, 'HH:mm:ss').diff(moment(proposedReservation.starting_hour, 'HH:mm:ss'))).asHours();

        console.log("totalHoursDoubles", totalHoursDoubles, "totalHoursSingles", totalHoursSingles, "ProposedDuration", proposedDuration )
    // Check if this is a doubles or singles reservation
    if (proposedReservation.user3_id || proposedReservation.user4_id) {
      // This is a proposed doubles reservation
      if (totalHoursDoubles + proposedDuration > 4) {
        return false; // Exceeds maximum doubles reservation hours per week
      }
    } else {
      // This is a proposed singles reservation
      if (totalHoursSingles + proposedDuration > 2) {
        return false; // Exceeds maximum singles reservation hours per week
      }
    }
  
    // If none of the checks fail, the user can make the reservation
    return true;
  }



    CreateReservation = async (reservation: Reservation, setAlert) => {
      // Check if the user can book this reservation
      if (await this.CanUserBookThisReservation(reservation.user1_id, reservation) &&
          await this.CanUserBookThisReservation(reservation.user2_id, reservation) &&
          (reservation.user3_id ? await this.CanUserBookThisReservation(reservation.user3_id, reservation) : true) &&
          (reservation.user4_id ? await this.CanUserBookThisReservation(reservation.user4_id, reservation) : true)) {
        try {
          const response = await fetch(`http://localhost:8000/api/reservations/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
          });

          return response;

        } catch (error){
          console.log('Handled Error when creating a reservation:', error);
        }
      } else {
        console.log("One or more users exceed their maximum reservation hours for the week.");
        setAlert({open: true, description: "One or more users exceed their maximum reservation hours for the week.", type:'error' })
        return null;
      }
    }

    UpdateReservation = async (reservation: Reservation, reservationId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/reservations/edit/${reservationId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservation)
          });
          
          console.log(response)

          if (!response.ok) {
            throw new Error('Failed to update reservation');
          }
          
          const data = await response.json();

          return data;
        }
        catch (error){
          console.log('Handled Error when updating a reservation:', error);
        }
      }

      DeleteReservation = async (reservationId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/reservations/delete/${reservationId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete reservation');
          }
          
          const data = await response.text();
    
          return data;
        }
        catch (error){
          console.log('Handled Error when deleting a reservation:', error);
        }
      }
}
