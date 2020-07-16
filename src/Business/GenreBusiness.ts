import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import { InvalidParameterError } from "../Errors/InvalidParamenterError";
import { GenreDatabase } from "../Data/GenreDatabase";
import { Genre } from "../Model/GenreMusicModel";

export class GenreBusiness {

    constructor(

        private genreDatabase: GenreDatabase,
        private auth: Authenticator,
        private hashGenerator: HashManager,
        private idGenerator: IdGenerator

    ) {}

    public async createGenre (
        
        music_genre:string
    ) {
        if(!music_genre) {

            throw new InvalidParameterError("Enter with a musical genre")

        } 

       const verifyGenre = await this.genreDatabase.getGenreByName(music_genre)

       if(verifyGenre) {

            throw new InvalidParameterError("Try other musical genre")
           
       } else {
           
            const idGenre = this.idGenerator.generate()

            const newGenre = await this.genreDatabase.createGenre(
                new Genre (
                    idGenre,
                    music_genre
                )
            )
            return newGenre

       }

    };
    public async getGenres() {

        const result = await this.genreDatabase.getGenres();

        if (!result) {
            
          throw new Error("None genres were found");
        };
        return result
    };
    
}