import { Reservation } from "../Interfaces/Interface";

export class ReservationService
{    
    FetchReservations = async () => {
        let response = await fetch("http://localhost:8000/api/reservations");
        let reservations: Reservation[] = await response.json();

        return reservations;
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
