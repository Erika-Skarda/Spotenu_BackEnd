import { MusicDatabase } from "../Data/MusicDatabase";
import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { GenericError } from "../Errors/GenericError";
import { Music } from "../Model/MusicModel";
import { NotFoundError } from "../Errors/NotFoundError";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";

export class MusicBusiness {

    constructor(
        private musicDatabase: MusicDatabase,
        private userDatabase: UserDatabase,
        private albumDatabase: AlbumDatabase,
        private idGenerator: IdGenerator
    ) {}

    public async createMusic(

        name: string,
        id_album : string
        ) {

        if(!name || !id_album) {
            
            throw new InvalidParameterError("Missing input")
            
        };
        const verufyMusic = await this.musicDatabase.getMusicByName(name, id_album)

        if(verufyMusic) {

            throw new NotFoundError("Try other name")

        }
        // const verifyAlbum = await this.albumDatabase.getAlbumById(id_album);

        // if(!verifyAlbum) {

        //     throw new NotFoundError("Try again, this playlist doesn't exist")

        // }
        const idMusic = this.idGenerator.generate();

        // const album = await this.musicDatabase.getMusicByName(name, id_album);

        // if(album) {

        //     throw new GenericError("This song has already been added!!!!")

        // } else {

            const newMusic = new Music(

                idMusic,
                name,
                id_album
            );

            const music = await this.musicDatabase.createMusic(newMusic);
            return music;
        // }


    };
    public async getMyMusics(id:string) {

       
        const user = await this.userDatabase.getUserById(id)

        if (!user) {
            throw new NotFoundError("Usuário não encontrado. Faça novo login.");
        }
        if (user.getRole() !== UserRole.BANDA) {

            throw new Unauthorized("Você não tem permissão para acessar esse endpoint.")
        }


        const musics = await this.musicDatabase.getMyMusics(id)
        return musics
    };
    
    public async getMusicsByAlbumId(albumId:string) {

        const allMusics = await this.musicDatabase.getMusicsByAlbumId(albumId)
        return allMusics

    }
    public async getAllMusics(){
        const allMusics = await this.musicDatabase.getAllMusics()
        return allMusics
    }

        
}