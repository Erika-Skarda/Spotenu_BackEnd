import { BaseDataBase } from "./BaseDatabase";
import { Music } from "../Model/MusicModel";

export class MusicDatabase extends BaseDataBase {

    protected table:string = "Spotenu_musics";

    private MusicFromModel(MusicModel?:any) : Music | undefined {

        return (
            MusicModel &&
            new Music (
                MusicModel.id,
                MusicModel.name,
                MusicModel.id_album
            )
        )
    };

    public async createMusic(newMusic: Music) : Promise<void> {
        try {

            await super.getConnection()
                .insert({
                    id: newMusic.getId(),
                    name: newMusic.getName(),
                    id_album: newMusic.getIdAlbum()

                })
                .into(this.table)

        } catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    };

    public async getMusicByName(music:string, idAlbum:string):Promise<Music | undefined> {
       
        try {
            const musicData = await super.getConnection().raw(`

                SELECT *
                FROM ${this.table}
                WHERE name = "${music}"
                AND
                WHERE id_album = "${idAlbum}"
            
            `)
            return (musicData[0][0]).length;
            

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    };
}