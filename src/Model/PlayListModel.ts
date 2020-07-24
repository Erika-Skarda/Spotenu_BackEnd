  
export class Playlist {
    constructor(
        private id : string,
        private name : string,
        private createdBy : string,
        private collaborative ?: boolean
    ) { }

    public getId(): string {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }

    public getcreatedBy (): string {
        return this.createdBy;
    }

    public getCollaborative(): boolean {
        return this.collaborative as boolean;
    }

}

export class MusicPlaylist {
    constructor(
        private id_playlist: string,
        private id_music: string
    ) {}


}