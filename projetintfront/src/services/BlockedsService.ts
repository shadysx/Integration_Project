import { BlockedCourt } from "../Interfaces/Interface";
import { CourtsService } from "./CourtsService";

export class BlockedsService
{
  
    FetchBlockeds = async () => {
        let response = await fetch("http://localhost:8000/api/blockeds");
        let courtsService = new CourtsService()
        let courts = await courtsService.FetchCourts()
        let blockeds: BlockedCourt[] = await response.json();

          // Loop over each blocked court
          for (let blockedCourt of blockeds) {
            // Find the corresponding court
            let court = courts.find(court => court.id === blockedCourt.court_id);
    
            // If court found, add the court number to the blocked court
            if (court) {
                blockedCourt.court_number = court.number;
            }
          }

        return blockeds;
    }

    CreateBlocked = async (blocked: BlockedCourt) => {
        try {
          const response = await fetch(`http://localhost:8000/api/blockeds/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(blocked)
          });
          
          console.log('HEAY' ,response)
      
          return response;
        }
        catch (error){
          console.log('Handled Error when creating a blockedCourt:', error);
        }
      }
  
      UpdateBlocker = async (blocked: BlockedCourt, blockedId: number) => {
                
        try {
            const response = await fetch(`http://localhost:8000/api/blockeds/edit/${blockedId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(blocked)
            });
            
            console.log(response)  
            
            if (!response.ok) {
                throw new Error('Failed to create Blockedcourt');
            }
            
            const data = await response.json();
    
            console.log("Blocked Update: ", data)
        
            return data;

            }
            catch (error){
            console.log('Handled Error when creating a Blockedcourt:', error);
            }
        }
  
        DeleteBlocked = async (blockedId: number) => {
          try {
            const response = await fetch(`http://localhost:8000/api/blockeds/delete/${blockedId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            if (!response.ok) {
              throw new Error('Failed to delete Blockedcourt');
            }
            
            const data = await response.text();
      
            return data;
          }
          catch (error){
            console.log('Handled Error when deleting a Blockedcourt:', error);
          }
        }


}
