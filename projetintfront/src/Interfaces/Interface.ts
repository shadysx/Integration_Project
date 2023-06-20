export interface Category{
    id: string,
    name: string,
    ageMin: number,
    ageMax: number
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
    categoryName?: string

}

export interface Court{
    id?: number,
    number: number
}

interface Reservation{

}