import { BaseDataBase } from "./BaseDatabase";
import { User, UserRole } from "../Model/UserModel";
import { NotFoundError } from "../Errors/NotFoundError";

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
        try {
            await this.getConnection().raw( `
                INSERT INTO ${this.table} (id, name, email, nickname, password, role, description_band)
                VALUES(
                "${newUser.getId()}",
                "${newUser.getName()}",
                "${newUser.getEmail()}",
                "${newUser.getNickname()}",
                "${newUser.getPassword()}",
                "${newUser.getRole()}",
                "${newUser.getDescription()}"
                )
            
            `)
        } catch (err) {

            throw new NotFoundError("Erro ao inserir novo usuário")
        }
    }
    public async getUserById(id: string): Promise<User | undefined> {
        try {
            const result = await super.getConnection().raw(`

             SELECT *  
             FROM ${this.table}
             WHERE id = '${id}'

            `);
            return this.UserFromUserModel(result[0][0]);
        
        } catch (err) {

            throw new NotFoundError("User not found")
        }
      }
    public async getUserByEmail(email:string): Promise<User | undefined> {
        try{

            const dataInfo = await super.getConnection().raw(`

            SELECT *
            FROM ${this.table}
            WHERE email = "${email}"
        
            `)

            return this.UserFromUserModel(dataInfo[0][0]);

        } catch (err) {

            throw new NotFoundError("User not found")
        }
    }
    public async getUserByNickname(nickname:string): Promise<User | undefined> {
        try{

            const dataInfo = await super.getConnection().raw(`

            SELECT *
            FROM ${this.table}
            WHERE nickname = "${nickname}"
        
            `)

            return this.UserFromUserModel(dataInfo[0][0]);

        } catch (err) {

            throw new NotFoundError("User not found")
        }
    }
    public async getAllUsers(): Promise<User[]> {

        const result = await super.getConnection().raw(`
          SELECT * 
          from ${this.table}
        `);
        return result[0].map((user: any) => {

          return this.UserFromUserModel(user);
        });
      }
    public async getUserByRole(id:string, role:string): Promise<any> {

        try {
            const result = await super.getConnection().raw(`
                SELECT * 
                FROM ${this.table}
                WHERE id = '${id}'
            `);
            
             const Newrole = this.UserFromUserModel(result[0][0]);

             if(Newrole.getRole() !== "admin")  {

                  await this.getConnection().raw(`
                    UPDATE ${this.table}
                    SET is_approved = 0
                    WHERE role = "${role}"
                `);
             }    

        } catch (err) {

            throw new NotFoundError("User not found")
        }

    }

}