import { Category } from "../Interfaces/Interface"

export class CategoriesService
{    
    FetchCategories = async () => {
        let response = await fetch("http://localhost:8000/api/categories");
        let categories: Category[] = await response.json();
        return categories;
    }

    CreateCategory = async (category: Category) => {
        try {
          const response = await fetch(`http://localhost:8000/api/categories/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(category)
          });
          
          console.log(response)
          if (!response.ok) {
            throw new Error('Failed to create category');
          }
          
          const data = await response.json();
  
          console.log("categoryUpdate: ", data)
      
          return data;
        }
        catch (error){
          console.log('Handled Error when creating a category:', error);
        }
      }
  
      UpdateCategory = async (category: Category, categoryId: number) => {
        console.log("test" + category)  
        
        try {
            const response = await fetch(`http://localhost:8000/api/categories/edit/${categoryId}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(category)
            });
            
            console.log(response)  
            
            if (!response.ok) {
                throw new Error('Failed to create category');
            }
            
            const data = await response.json();
    
            console.log("categoryUpdate: ", data)
        
            return data;

            }
            catch (error){
            console.log('Handled Error when creating a category:', error);
            }
        }
  
        DeleteCategory = async (categoryId: number) => {
          try {
            const response = await fetch(`http://localhost:8000/api/categories/delete/${categoryId}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              }
            });
            
            if (!response.ok) {
              throw new Error('Failed to delete category');
            }
            
            const data = await response.text();
      
            return data;
          }
          catch (error){
            console.log('Handled Error when deleting a category:', error);
          }
        }
}

