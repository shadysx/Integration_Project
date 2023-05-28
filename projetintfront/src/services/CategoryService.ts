import { Category } from "../components/Interfaces/Interface"

export class CaterogyService
{    
    FetchCategories = async () => {
        let response = await fetch("http://localhost:8000/api/categories");
        let categories: Category[] = await response.json();
        return categories;
    }
}

