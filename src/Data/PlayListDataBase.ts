import { BaseDataBase } from "./BaseDatabase";
import { User, UserRole } from "../Model/UserModel";
import { NotFoundError } from "../Errors/NotFoundError";
import { GenericError } from "../Errors/GenericError";
import { Playlist } from "../Model/PlayListModel";

export class PlayListDatabase extends BaseDataBase {

    protected table_playlist: string = "Spotenu_playlist";
    protected table_playlist_music: string = "Spotenu_playlist_music";

    private PlayListFromModel (PlayListModel?:any) : Playlist | undefined {
        return (
            PlayListModel &&
            new Playlist (
                PlayListModel.id,
                PlayListModel.name,
                PlayListModel.createdBy,
                PlayListModel.collaborative
            )
        )
    };

    public async createPlaylist(newPlaylist: Playlist): Promise<void> {

      try {

        await super.getConnection()
            .insert({
                id: newPlaylist.getId(),
                name: newPlaylist.getName(),
                createdBy: newPlaylist.getcreatedBy(),
                collaborative: super.convertBooleanToTinyint(false)
            })
            .into(this.table_playlist);

      } catch (err) {

            throw new Error(err.message || err.mysqlmessage);
     }      
    };
    public async getPlaylistById(id: string): Promise<Playlist | undefined> {
        const result = await super.getConnection()
            .select("*")
            .from(this.table_playlist)
            .where({ id })
            
        return this.PlayListFromModel(result[0])
    }
   
    public async addMusic(idPlaylist: string, music:string):Promise<void> {

        await super.getConnection()
            .insert({

                id_playlist:idPlaylist,
                id_music:music

            })
            .into(this.table_playlist_music)        
    };
}