import { BaseDataBase } from "./BaseDatabase";
import { Genre } from "../Model/GenreMusicModel"
import { NotFoundError } from "../Errors/NotFoundError";


export class GenreDatabase extends BaseDataBase {

    protected table:string = "Spotenu_Music_Genre";

    private Genre (GenreModel?:any) : Genre | undefined {
        return (
            GenreModel && 
            new Genre (
                GenreModel.id,
                GenreModel.music_genre

            )
        )
    }
    public async createGenre(newGenre:Genre) : Promise<void> {
        try {
            
            await super.getConnection()
                .insert({
                    id:newGenre.getId(),
                    music_genre:newGenre.getMusicGenre()

                })
                .into("Spotenu_Music_Genre");

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    }
    public async getGenreByName(genre:string):Promise<Genre | undefined> {
       
        try {
            const genreData = await super.getConnection().raw(`

                SELECT *
                FROM ${this.table}
                WHERE music_genre = "${genre}"
            
            `)
            return this.Genre(genreData[0][0])

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    }
    public async getGenreById(idGenre:string):Promise<Genre | undefined> {
       
        try {
            const genreData = await super.getConnection().raw(`

                SELECT *
                FROM ${this.table}
                WHERE id = "${idGenre}"
            
            `)
            return this.Genre(genreData[0][0])

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    }


}