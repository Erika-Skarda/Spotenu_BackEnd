import { BaseDataBase } from "./BaseDatabase";
import { Album } from "../Model/AlbumModel";
import { NotFoundError } from "../Errors/NotFoundError";

export class AlbumDatabase extends BaseDataBase {

    protected table : string = "Spotenu_album";
    protected table_albuns_genre : string = "Spotenu_albuns_genre";

 private AlbumFromModel(AlbumModel?:any) : Album | undefined {
    return (
            AlbumModel && 
            new Album (
                AlbumModel.id_album,
                AlbumModel.name,
                AlbumModel.createdBy,
                AlbumModel.id_genre

             )
         )
     }

    public async createAlbum(newAlbum: Album) : Promise<void> {

        try {

            await super.getConnection()
                .insert({

                    id_album: newAlbum.getId(),
                    name: newAlbum.getName(),
                    createdBy: newAlbum.getCreatedBy()

                })
                .into("Spotenu_album");

            await super.getConnection()
                .insert({
                    id_album: newAlbum.getId(),
                    id_genre: newAlbum.getGenre()

                })
                .into("Spotenu_albuns_genre");
                
        } catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
        
    };
    public async getAlbumById(idAlbum:string):Promise<Album | undefined> {
         
        try {
            const albumData = await super.getConnection().raw(`

                SELECT *
                FROM ${this.table}
                WHERE id ="${idAlbum}"
            
            `)
            return this.AlbumFromModel(albumData[0][0])

        }  catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    };
    
    
    public async DeleteAlbum(idAlbum:string):Promise<void> {

        try {

            await super.getConnection()
                .del()
                .from(this.table_albuns_genre)
                .where({id:idAlbum});
            
            await super.getConnection()
                .del()
                .from(this.table)
                .where({id_album:idAlbum})

        } catch (err) {

            throw new Error(err.message || err.mysqlmessage);
        }
    }
}
