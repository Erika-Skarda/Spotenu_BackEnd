import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { User, UserRole } from "../Model/UserModel";
import { NotFoundError } from "../Errors/NotFoundError";
import { BandOrderDTO } from "../DTO/UserDTO";
import { GenericError } from "../Errors/GenericError";
import { Unauthorized } from "../Errors/Unauthorized";

export class UserBusiness {

    constructor(
        private userDatabase: UserDatabase,
        private auth: Authenticator,
        private hashGenerator: HashManager,
        private idGenerator: IdGenerator

    ) {}

    public async signup (

        name: string,
        email: string,
        nickname: string,
        password: string,
        role: string,
        description_band?:string

    ) {
        if(!name || !email || !nickname || !password || !role) {

            throw new InvalidParameterError("Missing input")
        } 
        if(email.length <= 6) {

            throw new InvalidParameterError("Invalid Password")
        }
        if(email.indexOf("@") === -1 || email.indexOf(".com") === -1) {

            throw new InvalidParameterError("Invalid E-mail")
        }
        if (role === UserRole.ADMIN && password.length <= 10) {

            throw new InvalidParameterError(

              "Invalid password"
            );
          }
        if(role === UserRole.BANDA && !description_band) {

          throw new InvalidParameterError(

            "Invalid description"
          );
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashGenerator.hash(password)
        
        const user = new User (
            id, 
            name, 
            email, 
            nickname, 
            hashPassword, 
            User.mapStringToUserType(role), 
            description_band
          )

        await this.userDatabase.createUser(user)

        if(role !== "admin") {

              await this.userDatabase.getUserByRole(id, role)
        }

        const token = this.auth.generateToken({
            id,
            role
        });

        return{ Access_token: token }  

    }
    public async login( 
       
        emailORPassword:string,
        password: string

        ) {

    if (!emailORPassword) {

      throw new InvalidParameterError("Missing input");
    }

    if(emailORPassword) {

      const email = await this.userDatabase.getUserByEmail(emailORPassword);
      const nickname = await this.userDatabase.getUserByNickname(emailORPassword);
      
      if(email) { 
        if(email.getRole() === UserRole.BANDA && email.getApprove() == false) {

          throw new Unauthorized("Wait bitch");

        } else {

          const isPasswordCorrect = await this.hashGenerator.compare(
              password, 
              email.getPassword()
            )
  
            if(!isPasswordCorrect) {

                throw new InvalidParameterError("Inavalid input");

            } else {
              const token = await this.auth.generateToken({

                id:email.getId(), 
                role:email.getRole()
              })
            
              return{ Access_token: token } 
            }
       }
      } else if (nickname) {

        if(nickname.getRole() === UserRole.BANDA && nickname.getApprove() === false) {

          throw new Unauthorized("Wait to be approved!");

        } else {
          const isPasswordCorrect = await this.hashGenerator.compare(
            password, 
            nickname.getPassword()
          );



          if(!isPasswordCorrect) {

              throw new InvalidParameterError("Somethings wrong");

          } else {const token = await this.auth.generateToken({

              id:nickname.getId(), 
              role:nickname.getRole()

            })

            return{ Access_token: token } 
          }
  
        }

        } else {

          throw new InvalidParameterError("Invalid input")


        }
      }       
    }

    public async approveBand(id: string) {
      const band = await this.userDatabase.getUserById(id)
       
      if (!band) {

        throw new NotFoundError("Band not found");

      }

      await this.userDatabase.approveBand(id)
      const bandNmae = await this.userDatabase.getUserById(id)

       return {Banda: bandNmae.getName()}
    }  
    public async getUsersByTypeAndSortAndPage(role:string, order:BandOrderDTO, page:number) {
      const usersPerPage = 5
      let offset = usersPerPage * (page - 1)
      
      return await this.userDatabase.getUsersByTypeAndSortAndPage(role, order, usersPerPage, offset)
    }
    public async getUsersByRole(role: string) {

      const result = await this.userDatabase.getUsersByRole(role)

      if (!result) {

        throw new GenericError("Role not found");
      }
      return result
    }

}