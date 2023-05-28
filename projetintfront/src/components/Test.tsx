import React from 'react'
import { CaterogyService } from '../services/CategoryService'

function Test() {
  let categoryService = new CaterogyService()
  return (
    <>
      <div>{"Jambon"}</div>
      <button onClick={() => categoryService.FetchCategories()}> Click ME UwU </button>
    </>    
  )
}

export default Test

