import { Category } from "../Interfaces/Interface"

export class CategoriesService
{    
    FetchCategories = async () => {
        let response = await fetch("http://localhost:8000/api/categories");
        let categories: Category[] = await response.json();
        return categories;
    }


}

