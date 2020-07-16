import { MusicDatabase } from "../Data/MusicDatabase";
import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { GenericError } from "../Errors/GenericError";
import { Music } from "../Model/MusicModel";

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
        const verifyAlbum = await this.albumDatabase.getAlbumById(id_album);

        if(!verifyAlbum) {


        }
        const idMusic = this.idGenerator.generate();

        const album = await this.musicDatabase.getMusicById(idMusic, id_album);

        if(album) {

            throw new GenericError("This song has already been added!!!!")

        } else {

            const newMusic = new Music(

                idMusic,
                name,
                id_album
            );

            const music = await this.musicDatabase.createMusic(newMusic);
            return music;
        }


    }
        
}