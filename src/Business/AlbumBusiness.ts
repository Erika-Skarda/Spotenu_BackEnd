import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { Album } from "../Model/AlbumModel";
import { Genre } from "../Model/GenreMusicModel";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { Unauthorized } from "../Errors/Unauthorized";
import { GenericError } from "../Errors/GenericError";

export class AlbumBusiness {

    constructor(
        private albumDatabase: AlbumDatabase,
        private userDatabase : UserDatabase,
        private idGenerator: IdGenerator
    ) {}

    public async createAlbum(
        
        name: string,
        createdBy: string,
        id_genre:Genre[]

    ) {

        if(!name || !id_genre) {
            
            throw new InvalidParameterError("Missing input")

        };

        const bandApproved = await this.userDatabase.getUserById(createdBy)

         if(!bandApproved.getApprove()) {

            throw new Unauthorized("Unauthorized!!!!!")

         }
        
        const idAlbum = this.idGenerator.generate();
        const newAlbum = new Album (

            idAlbum,
            name,
            bandApproved.getId(),
            id_genre
        );
         const album = await this.albumDatabase.createAlbum(newAlbum)
         return album;

    };

    public async deleteAlbum(

        idAlbum:string
    ){
        const album = await this.albumDatabase.getAlbumById(idAlbum);

        if(!album) {

            throw new GenericError("This album doesn't exist!!!");
        }

        await this.albumDatabase.DeleteAlbum(idAlbum)
    };
    
}
