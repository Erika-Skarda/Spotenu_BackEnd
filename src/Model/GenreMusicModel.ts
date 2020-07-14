export class Genre {

    constructor(
        private id: string,
        protected music_genre: string
    ) {}

    public getId() : string {
        return this.id

    }
    public getMusicGenre() : string{
        return this.music_genre
    }
}