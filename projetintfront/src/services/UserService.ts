import { Helper } from "../Helpers/Helper";
import { Category, User } from "../Interfaces/Interface"

export class UserService
{    
    FetchUsers = async () => {
        let response = await fetch("http://localhost:8000/api/users");
        let users: User[] = await response.json();

        //Assign category
        users = users.map(user => {
          if (user.categories && user.categories.length > 0) {
            user.categoryName = (user.categories[0]).name ;
            user.categoryId = [user.categories[0].id]
          }
          return user;
        });

        for (const user of users) {
          user.fullName = `${user.lastName} ${user.firstName}` 
          console.log("test");
        }

        console.log('Users with category and full name', users)
        return users;
    }

    CreateUser = async (user: User) => {
      try {
        const response = await fetch(`http://localhost:8000/api/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        });
        
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to create user');
        }
        
        const data = await response.json();

        console.log("userUpdate: ", data)
    
        return data;
      }
      catch (error){
        console.log('Handled Error when creating a user:', error);
      }
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
            throw new Error('Failed to update user');
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

