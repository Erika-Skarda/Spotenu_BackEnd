import { BaseDataBase } from "../Data/BaseDatabase";
import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import express, { Request, Response } from "express";
import { Album } from "../Model/AlbumModel";
import { AlbumInputDTO, GetAlbumByIdInputDTO } from "../DTO/AlbumDTO";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";
import { AlbumBusiness } from "../Business/AlbumBusiness";
import { AlbumDatabase } from "../Data/AlbumDatabase";

export class AlbumController extends BaseDataBase {

    private static AlbumBusiness = new AlbumBusiness(
        new AlbumDatabase(),
        new UserDatabase(),
        new IdGenerator()
    )
    public async createAlbum(req:Request, res: Response) {

        try {

            const newAlbum: AlbumInputDTO = {

                name: req.body.name,
                createdBy: req.headers.authorization as string,
                id_genre: req.body.id_genre,
                photo: req.body.photo

            }

            //const accessToken = req.headers.authorization as string;
            const adminToken = new Authenticator().getData(newAlbum.createdBy)
            
            if(adminToken.role !== UserRole.BANDA) {
                
                throw new Unauthorized("Unauthorized!!!!!")

            } else {

                const album = await AlbumController.AlbumBusiness.createAlbum(

                    newAlbum.name,
                    adminToken.id,
                    newAlbum.id_genre,
                    newAlbum.photo

                )
                
                res.status(200).send({ message: "Album created", album })
            }

        } catch (err) {
 
            res.status(err.errorCode || 400).send({ message: err.message || err.mysqlmessage} )
        }
        //await this.destroyConnection();
    };
    public async getAlbunsByBandId(req: Request, res: Response) {
        try {
            const token = req.headers.authorization || req.headers.Authorization as string
            const verifyBandoken = new Authenticator().getData(token)

            if(verifyBandoken.role !== UserRole.BANDA) {

                throw new Unauthorized("Você não tem permissão para buscar álbuns por artista!")
            }
            const albuns = await AlbumController.AlbumBusiness.getAlbunsByBandId(verifyBandoken.id)

            res.status(200).send(albuns)
        }
        catch (err) {
       
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
    public async deleteAlbum(req:Request, res:Response) {

        try {

            const idDTO:GetAlbumByIdInputDTO = {

                id: req.params.id
            };

            const token = req.headers.authorization!
            const verifyToken = new Authenticator().getData(token);

            if(verifyToken.role !== UserRole.BANDA) {
                
                throw new Unauthorized("Unauthorized!!!!!")

            } else {

                const album = await AlbumController.AlbumBusiness.deleteAlbum (

                    idDTO.id
                );
                
                res.status(200).send({ message: "Album deleted", album })
            }


        } catch (error) {

            res.status(error.errorCode || 400).send( {message: error.message})
          }
    };


}