import { User } from "../Interfaces/Interface"

export class UserService
{    
    FetchUsers = async () => {
        let response = await fetch("http://localhost:8000/api/users");
        let users: User[] = await response.json();
        return users;
    }

    UpdateUser = async (user: User, userId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/users/edit/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          });
          
          console.log(response)

          if (!response.ok) {
            throw new Error('Failed to update wish');
          }
          
          const data = await response.json();

          console.log("userUpdate: ", data)
      
          return data;
        }
        catch (error){
          console.log('Handled Error when updating a user:', error);
        }
      }

      DeleteUser = async (userId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/users/delete/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          if (!response.ok) {
            throw new Error('Failed to delete user');
          }
          
          const data = await response.text();
    
          return data;
        }
        catch (error){
          console.log('Handled Error when deleting a user:', error);
        }
      }
}

