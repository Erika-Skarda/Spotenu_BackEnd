export interface SignupInputDTO {
    name: string,
    email: string,
    nickname:string,
    password: string,
    role: string,
    description_band:string
}

export interface GetUserByIdInputDTO {
    id: string
}