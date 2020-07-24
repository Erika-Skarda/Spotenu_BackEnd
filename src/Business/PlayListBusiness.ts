import { PlayListDatabase } from "../Data/PlayListDataBase";
import { UserDatabase } from "../Data/UserDatabase";
import { MusicDatabase } from "../Data/MusicDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import { Authenticator } from "../Services/Authenticator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";
import { Playlist } from "../Model/PlayListModel";
import { NotFoundError } from "../Errors/NotFoundError";

export class PlayListBusiness {

    constructor (
        private playlistDatabase: PlayListDatabase,
        private userDatabase: UserDatabase,
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator,
        private auth: Authenticator
    ) {}

    public async createPlayList(

        name: string,
        createdBy: string

    ) {

        if(!name) {

            throw new InvalidParameterError("Missing input")
        }

        
        const idPlayList = await this.idGenerator.generate()

        // const playList = await this.userDatabase.getUserById(createdBy)

        // if(playList.getRole() !== UserRole.OUVINTE_PAGANTE) {

        //     throw new Unauthorized("Unauthorized!!!!!")
        // }

        const newPlayList = new Playlist (
            idPlayList,
            name,
            createdBy
        )
        await this.playlistDatabase.createPlaylist(newPlayList)
    };
    //******************************************************//
    public async addMusic(

        id_playlist: string,
        id_music: string,
        createdByOrCollab: string
    ) {

        const verifyPlaylist = await this.playlistDatabase.getPlaylistById(id_playlist)

        if(!verifyPlaylist) {

            throw new NotFoundError("Try again, this playlist doesn't exist")
        }
        
        const verifyMusic = await this.musicDatabase.getMusicId(id_music)
        
        if(!verifyMusic) {

            throw new NotFoundError("Try again, this music doesn't exist")
        }
        const verifyCreatedBy = await this.playlistDatabase.getPlaylistsByCreatedBy(createdByOrCollab)
        
        if(verifyCreatedBy) {

            await this.playlistDatabase.addMusic(id_playlist, id_music) 
            
        }
        const verifyCollab = await this.playlistDatabase.getPlaylistsByCreatedBy(createdByOrCollab)
        
        if(verifyPlaylist.getCollaborative() === false) {

            throw new Unauthorized("You can't do this!")

        } else {

            if(verifyCollab) {

            await this.playlistDatabase.addMusic(id_playlist, id_music)   

            }
        }
    };
}    