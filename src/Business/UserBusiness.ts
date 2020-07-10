import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { User } from "../Model/UserModel";

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
        role: string

    ) {
        if(!name || !email || !nickname || !password) {

            throw new InvalidParameterError("Missing input")
        } 
        if(email.length <= 6) {

            throw new InvalidParameterError("Invalid Password")
        }
        if(email.indexOf("@") === -1 || email.indexOf(".com") === -1) {

            throw new InvalidParameterError("Invalid E-mail")
        }

        const id = this.idGenerator.generate()

        const hashPassword = await this.hashGenerator.hash(password)
        
        const user = new User (id, name, email, nickname, hashPassword, User.mapStringToUserType(role))

        await this.userDatabase.createUser(user)

        const token = this.auth.generateToken({
            id,
            role
        });

        return{ Access_token: token }  

    }
}