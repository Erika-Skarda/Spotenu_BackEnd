import { Genre } from "../Model/GenreMusicModel";

export interface AlbumInputDTO {
    name: string,
    createdBy: string,
    id_genre: Genre[]
};

export interface GetAlbumByIdInputDTO {
    id: string
}