import { Genre } from "./GenreMusicModel";

export class Album {

    constructor(
        private id_album: string,
        private name: string,
        private createdBy: string,
        private id_genre: Genre[],
        private photo?: string

    ) {
    }
    
    public getId(): string {
        return this.id_album
    }
    public getName():string {
        return this.name
    }
    public getCreatedBy():string {
        return this.createdBy
    }
    public getGenre():Genre[] {
        return this.id_genre
    }
    public getPhoto():string {
        return this.photo
    }
    public setGenre(genres: Genre[]){
        this.id_genre = genres;
    }
}