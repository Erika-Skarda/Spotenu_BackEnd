import { BaseDataBase } from "./BaseDatabase";
import { User } from "../Model/UserModel";

export class UserDatabase extends BaseDataBase {

    table:string = "Spotenu_User";

    private UserFromUserModel(UserModel?:any) : User | undefined {
        return (
            UserModel &&
            new User (
                UserModel.id,
                UserModel.name,
                UserModel.email,
                UserModel.nickname,
                UserModel.password,
                UserModel.role,
                UserModel.description_band

            )
        )
    }
    public async createUser(newUser:User):Promise<void> {
        await this.getConnection().raw( `
            INSERT INTO ${this.table} (id, name, email, nickname, password, role)
            VALUES(
               "${newUser.getId()}",
               "${newUser.getName()}",
               "${newUser.getEmail()}",
               "${newUser.getNickname()}",
               "${newUser.getPasword()}",
               "${newUser.getRole()}"
            )
        
        `)
    }

}