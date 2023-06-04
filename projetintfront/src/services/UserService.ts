import { User } from "../Interfaces/Interface"

export class UserService
{    
    FetchUsers = async () => {
        let response = await fetch("http://localhost:8000/api/users");
        let users: User[] = await response.json();
        return users;
    }
}

