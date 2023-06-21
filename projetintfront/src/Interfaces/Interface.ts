export interface Category{
    id?: number,
    name?: string,
    ageMin?: number,
    ageMax?: number
}

export interface User{
    id?: number,
    lastName: string,
    firstName: string,
    affiliationNumber: string,
    dateOfBirth: string,
    email: string,   
    gender: string,
    isAdmin: boolean
    locality: string
    mobile: string
    postalCode: string
    ranking: string
    status: string
    street: string
    password: string
    categories?: Category[]
    categoryName?: string,
    fullName?: string
    categoryId?: number[];

}

export interface Court{
    id?: number,
    number: number
}

export interface CategoryDTO {
    id: number[]
}


export interface Reservation{
    id?: number,
    starting_hour: string,
    ending_hour: string,
    date: string,
    user1_id: number,
    user2_id: number,
    user3_id?: number,
    user4_id?: number,
    court_id: number
}

