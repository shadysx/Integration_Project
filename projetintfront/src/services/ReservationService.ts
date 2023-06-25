import { Helper } from "../Helpers/Helper";
import React, {useContext} from 'react';
import { Court, Reservation, User } from "../Interfaces/Interface";
import { UserService } from "./UserService";
import moment from 'moment';
import { AuthContext } from "../contexts/AuthContext";
import { CourtsService } from "./CourtsService";

export class ReservationService
{    

  FetchReservations = async () => {
    let response = await fetch("http://localhost:8000/api/reservations");
    let reservations: Reservation[] = await response.json();
  
    // Fetch users and courts once
    let usersService = new UserService();
    let courtsService = new CourtsService();
    let users: User[] = await usersService.FetchUsers();
    let courts: Court[] = await courtsService.FetchCourts(); // assuming FetchCourts is a function in usersService
  
    let retVal: Reservation[] = [];
  
    for (const res of reservations) {
      let user1 = users.find(user => user.id === res.user1_id);
      let user2 = users.find(user => user.id === res.user2_id);
      let user3 = users.find(user => user.id === res.user3_id);
      let user4 = users.find(user => user.id === res.user4_id);
      let court = courts.find(court => court.id === res.court_id);
  
      res.user1_name = user1 ? `${user1.lastName} ${user1.firstName}` : null;
      res.user2_name = user2 ? `${user2.lastName} ${user2.firstName}` : null;
      res.user3_name = user3 ? `${user3.lastName} ${user3.firstName}` : null;
      res.user4_name = user4 ? `${user4.lastName} ${user4.firstName}` : null;
      res.court_number = court ? court.number : null;
  
      retVal.push(res);
    }
  
    console.log('reservations after fetch', retVal);
    return reservations;
  }

    CreateReservation = async (reservation: Reservation, setAlert) => {
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
