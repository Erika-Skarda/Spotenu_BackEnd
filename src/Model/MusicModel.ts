export class Music {

    constructor (
        private id: string,
        private name: string,
        private id_album : string
    ) {}
    
    public getId(): string {
        return this.id
    }
    public getName():string {
        return this.name
    }
    public getIdAlbum():string {
    return this.id_album
}

}