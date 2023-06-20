import { Category } from "../Interfaces/Interface";
import { CategoriesService } from "../services/CategoriesService";

export class Helper {
    static async ConvertCategoryNameToId(categoryName: string){
        const categoriesService = new CategoriesService();
        let categories: Category[] = await categoriesService.FetchCategories();
        const foundCategory = categories.find(category => category.name === categoryName);
        console.log('Found Category', foundCategory.id)

        if (foundCategory) {
            return foundCategory.id;
          } else {
            return null;
          }

    }
} 

