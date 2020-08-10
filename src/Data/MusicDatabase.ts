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
    public async getMyMusics(id: string): Promise<any[]> {
        const result = await super.getConnection().raw(`
            SELECT 
                m.name as music,
                m.id_album,
                m.id as music_id,

                a.name as album,
                a.createdBy,

                u.name as band,
                u.nickname

            FROM ${this.table} as m
            JOIN Spotenu_album as a 
            ON m.id_album = a.id_album
            
            JOIN Spotenu_User as u 
            ON a.createdBy = u.id
            WHERE a.createdBy = "${id}"
            `)
            return result[0]
        }
    public async getMusicsByAlbumId(albumId: string): Promise<Music[]> {
        const result = await super.getConnection().raw(`
            SELECT *
            FROM ${this.table}
            WHERE id_album = "${albumId}"
        `)
        return result[0].map((res: any) => this.MusicFromModel(res))
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
            return this.MusicFromModel(musicData[0]);
            

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    };
    public async getMusicId(music_id:string):Promise<any> {
       
        try {
            const musicData = await super.getConnection().raw(`

                SELECT *
                FROM ${this.table}
                WHERE id = "${music_id}"
              
            
            `)
            return (musicData[0][0]);
            

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    };

    //TESTAR AINDA
    
    public async getAllMusics(): Promise<any[]> {

        const result = await super.getConnection().raw(`
            SELECT 
                m.name as music_name,
                m.id as music_id,
                m.id_album,

                a.name as album_name,

                u.name as band_name,
                u.id as band_id,
                u.description_band as band_description,

                g.music_genre as genre_name,
                g.id as genre_id

            FROM ${this.table} as m
            JOIN Spotenu_album as a ON m.id_album = a.id_album
            JOIN Spotenu_User u ON a.cratedBy = u.id
            JOIN Spotenu_albuns_genre gag ON a.id_album = gag.id_album
            JOIN Spotenu_Music_Genre g ON gag.id_genre = g.id
            ORDER BY m.name ASC
        `)
        let arrayMusic: any[] = []

        for (let music of result[0]) {
            const musicInArr = arrayMusic.find((item: any) =>
                item.music_id === music.music_id)
            if (!musicInArr) {
                let music2 = {
                    ...music,
                    genres: [{
                        name: music.genre_name,
                        id: music.genre_id
                    }]
                }
                arrayMusic.push(music2)
            }
            else {
                musicInArr.genres.push({
                    name: music.genre_name,
                    id: music.genre_id
                })
            }
        }

        return arrayMusic
    }

}