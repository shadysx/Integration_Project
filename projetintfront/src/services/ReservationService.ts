import { Helper } from "../Helpers/Helper";
import { Reservation } from "../Interfaces/Interface";
import { UserService } from "./UserService";

export class ReservationService
{    
  FetchReservations = async () => {
    let response = await fetch("http://localhost:8000/api/reservations");
    let reservations: Reservation[] = await response.json();
  
    let retVal: Reservation[] = [];
  
    for (const res of reservations) {
      let user1Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user1_id);
      let user2Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user2_id);
      // let user3Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user3_id);
      // let user4Name = await Helper.ConvertUserIdToLastNameAndFirstName(res.user4_id);
  
      res.user1_name = user1Name;
      res.user2_name = user2Name;
  
      retVal.push(res);
      // res.user3_name = user3Name;
      // res.user4_name = user4Name;
    }
  
    console.log('reservations after fetch', retVal);
    return retVal;
  }
  

    CreateReservation = async (reservation: Reservation) => {
      try {
        const response = await fetch(`http://localhost:8000/api/reservations/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(reservation)
        });
        
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to create reservation');
        }
        
        const data = await response.json();

        return data;
      }
      catch (error){
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
