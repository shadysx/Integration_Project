export interface Category{
    id?: number,
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



export interface Reservation{
    id?: number,
    startingHour: Date,
    endingHour: Date,
    date: Date,
    user1Id: number,
    user2Id: number,
    user3Id?: number,
    user4Id?: number,
    courtId: number
}

