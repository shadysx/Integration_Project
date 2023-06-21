import { Court } from "../Interfaces/Interface"

export class CourtsService
{    
    FetchCourts = async () => {
        let response = await fetch("http://localhost:8000/api/courts");
        let courts: Court[] = await response.json();
        return courts;
    }

    CreateCourt = async (court: Court) => {
      try {
        const response = await fetch(`http://localhost:8000/api/courts/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(court)
        });
        
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to create court');
        }
        
        const data = await response.json();
    
        return data;
      }
      catch (error){
        console.log('Handled Error when creating a court:', error);
      }
    }

    UpdateCourt = async (court: Court, courtId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/courts/edit/${courtId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(court)
          });
          
          console.log(response)

          if (!response.ok) {
            throw new Error('Failed to update court');
          }
          
          const data = await response.json();

          console.log("courtUpdate: ", data)
      
          return data;
        }
        catch (error){
          console.log('Handled Error when updating a court:', error);
        }
      }

      DeleteCourt = async (courtId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/courts/delete/${courtId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete court');
          }
          
          const data = await response.text();
    
          return data;
        }
        catch (error){
          console.log('Handled Error when deleting a court:', error);
        }
      }
}

