import { InvalidParameterError } from "../Errors/InvalidParamenterError"

export class User {

    constructor (
        private id: string,
        private name: string,
        private email: string,
        private nickname: string,
        private password: string,
        private role: UserRole,
        private description_band?: string
    ) {}

    public getId(): string {
        return this.id
    }
    public getName():string {
        return this.name
    }
    public getEmail():string {
        return this.email
    }
    public getNickname():string {
        return this.nickname
    }
    public getPasword():string {
        return this.password
    }
    public getRole():UserRole {
        return this.role
    }
    public getDescription():string {
        return this.description_band
    }

    static mapStringToUserType(role:string):UserRole {

        switch(role) {
            
            case "banda" :
              return UserRole.BANDA;
            case "ouvinte pagante" :
              return UserRole.OUVINTE_PAGANTE;
            case "ouvinte não pagante":
              return UserRole.OUVINTE_NAO_PAGANTE;
            case "admin":
              return UserRole.ADMIN;
            default:
              throw new InvalidParameterError("Invalid user role, try again")
        }
    }
}


export enum UserRole {

    BANDA = "banda",
    OUVINTE_PAGANTE = "ouvinte pagante",
    OUVINTE_NAO_PAGANTE = "ouvinte não pagante",
    ADMIN = "admin"


}

