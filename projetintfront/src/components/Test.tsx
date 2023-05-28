import React, { useEffect, useState } from 'react'
import { CaterogyService } from '../services/CategoryService'
import { Category } from './Interfaces/Interface';

function Test() {

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const FetchCategories = async () => {
      const categoryService = new CaterogyService();
      const fetchedCategories: Category[] = await categoryService.FetchCategories();
      setCategories(fetchedCategories);
    }
    FetchCategories();
  },[])

  return (
    <>
      {categories.map((categorie, index) => {
        return <div key={index}>{categorie.name}</div>
      })}
    </>    
  )
}

export default Test

