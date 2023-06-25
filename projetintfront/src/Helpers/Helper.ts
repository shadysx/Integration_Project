import { Category, User } from "../Interfaces/Interface";
import { CategoriesService } from "../services/CategoriesService";
import { CourtsService } from "../services/CourtsService";
import { UserService } from "../services/UserService";

export class Helper {
    static async ConvertCategoryNameToId(categoryName: string){
        const categoriesService = new CategoriesService();
        let categories: Category[] = await categoriesService.FetchCategories();
        const foundCategory = categories.find(category => category.name === categoryName);
        console.log('Found Category', foundCategory.id)

        if (foundCategory) {
            console.log("Found Category: ", foundCategory)
            return foundCategory.id;
          } else {
            console.log("Not Found Category: ", foundCategory)
            return null;
          }
    }

    static async ConvertUserIdToLastNameAndFirstName(id: number) {
        const usersService = new UserService();
        let users: User[] = await usersService.FetchUsers();
        let foundUser = users.find(user => user.id === id)

        if(foundUser){
          return `${foundUser.lastName} ${foundUser.firstName}`
        } else {
          return null
        }
    }

    static async ConvertUserFullNameToId(fullName: string) {
      const usersService = new UserService();
      let users: User[] = await usersService.FetchUsers();
      console.log("fullname in helper", fullName)
      console.log('users in helper', users)
      let foundUser = users.find(user => user.fullName === fullName)
      if (foundUser) {
          return foundUser.id;
        } else {
          return null;
        }
  }

    static async ConvertCourtIdToNumber(courtId: number){
      const courtsService = new CourtsService()
      let courts = await courtsService.FetchCourts()
      let foundCourt = courts.find(court => court.id == courtId)

      if(foundCourt){
        return foundCourt.number
      } else {
        return null
      }
    }
    static CalculateDuration = (startingHour: string, endingHour: string): number => {
      let start = new Date(`2000-01-01T${startingHour}`);
      let end = new Date(`2000-01-01T${endingHour}`);
      return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
    }

} 

