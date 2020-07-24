import { BaseDataBase } from "./BaseDatabase";
import { User, UserRole } from "../Model/UserModel";
import { NotFoundError } from "../Errors/NotFoundError";
import { GenericError } from "../Errors/GenericError";
import { BandOrderDTO } from "../DTO/UserDTO";

export class UserDatabase extends BaseDataBase {

    protected table:string = "Spotenu_User";

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
                UserModel.description_band,
                UserModel.is_approved

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

            throw new Error(err.message || err.mysqlmessage);
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
            console.log(err)
            throw new NotFoundError("User not found")
        }
      }
    public async getUserByEmail(email:string): Promise<User | undefined> {
  

            const dataInfo = await super.getConnection().raw(`

            SELECT *
            FROM ${this.table}
            WHERE email = "${email}"
        
            `)

            return this.UserFromUserModel(dataInfo[0][0]);

     
    }
    public async getUserByNickname(nickname:string): Promise<User | undefined> {
      

            const dataInfo = await super.getConnection().raw(`

            SELECT *
            FROM ${this.table}
            WHERE nickname = "${nickname}"
        
            `)

            return this.UserFromUserModel(dataInfo[0][0]);

       
    }
 
    public async getUserByRole(id:string, role:string) : Promise<any> {

        try {
            const result = await super.getConnection().raw(`
                SELECT * 
                FROM ${this.table}
                WHERE id ='${id}'
            `);
            
             const Newrole = this.UserFromUserModel(result[0][0]);

             if(Newrole.getRole() === UserRole.BANDA)  {

                  await super.getConnection().raw(`
                    UPDATE ${this.table}
                    SET is_approved = 0
                    WHERE id="${id}"
                
                `);
             }    

        } catch (err) {

            throw new NotFoundError("User not found")
        }

    }
    public async approveBand(id: string) : Promise<any>{

        try { 

            const queryData = await this.getConnection().raw(`
                SELECT * 
                FROM ${this.table}
                WHERE id = '${id}'
            `);
    
         const band = this.UserFromUserModel(queryData[0][0]);
      
            if((band.getApprove()) === true) {

                throw new GenericError("Usuário já aprovado!");
            } 
       
            await super.getConnection().raw(`
                UPDATE ${this.table}
                SET is_approved = 1
                WHERE id = "${id}"
           `);


        }  catch (err) {
          
            throw new NotFoundError("User not found")
        }
       
    }
    public async getUsersByTypeAndSortAndPage(
            role:string, 
            order: BandOrderDTO, 
            usersPerPage:number, 
            offset:number
        ) : Promise<User[]> {

        const allUsersByType = await super.getConnection()
        .select("name", "nickname","email", "is_approved")
        .from(this.table)
        .where({role:role})
        .orderBy(order.by, order.type)
        .limit(usersPerPage)
        .offset(offset);

        return allUsersByType.map((user: any) => {

            return this.UserFromUserModel(user);
        });

        //const usersArray: User[] = [];

        // if(allUsersByType) {

        //      for(const user of allUsersByType) {

        //          const userRole = new User (

        //            user.getId(),
        //            user.getName(),
        //            user.getEmail(),
        //            user.getNickname(),
        //            user.getRole(),
        //            user.getApprove()

        //         );

        //        usersArray.push(userRole);
        //      }
        //     return usersArray;

        // } else {

        //     return usersArray;

        // }
    }
    public async getUsersByRole(role: string): Promise<User[]> {

        const result = await super.getConnection().raw(`
          SELECT name, email, nickname, is_approved

          FROM ${this.table}
          WHERE role = "${role}"
         
        `);
          return result[0].map((user: any) => {

            return this.UserFromUserModel(user);
        });
      }
    public async getAllBands(): Promise<User[]> {

        const result = await super.getConnection().raw(`
          SELECT *
          FROM ${this.table}
          WHERE role = "banda"     
        `);
          return result[0].map((user: any) => {

            return this.UserFromUserModel(user);
        });
      }
      
      public async updateName(id: string, newName: string): Promise<void> {
          await super.getConnection().raw(`
          UPDATE ${this.table}
            SET name = "${newName}"
            WHERE id = "${id}"
            `)
        };
        
        public async updateOuvinte(id: string): Promise<void> {
            await super.getConnection().raw(`
            UPDATE ${this.table}
            SET role = '${UserRole.OUVINTE_PAGANTE}'
            WHERE id = "${id}"
            `)
        };
        
        public async blockUser(id: string): Promise<void> {
            await super.getConnection().raw(`
                UPDATE ${this.table}
                SET is_approved = 0 
                WHERE id = "${id}"
            `)
        };
        public async getUserByName(name:string): Promise<User | undefined> {
  

            const dataInfo = await super.getConnection().raw(`

            SELECT *
            FROM ${this.table}
            WHERE name = "${name}"
        
            `)

            return this.UserFromUserModel(dataInfo[0][0]);

     
    }
}