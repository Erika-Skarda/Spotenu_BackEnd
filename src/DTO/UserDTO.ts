export interface SignupInputDTO {
    name: string,
    email: string,
    nickname:string,
    password: string,
    role: string,
    photo: string,
    description_band:string
}
export interface BandOrderDTO {
    by: string;
    type: string;
  }
export interface GetUserByIdInputDTO {
    id: string
}