import { BaseDataBase } from "../Data/BaseDatabase";
import { MusicBusiness } from "../Business/MusicBusiness";
import { MusicDatabase } from "../Data/MusicDatabase";
import { UserDatabase } from "../Data/UserDatabase";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import express, { Request, Response } from "express";
import { MusicInputDTO, GetMusicByIdInputDTO } from "../DTO/MusicDTO";
import { Authenticator } from "../Services/Authenticator";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";

export class MusicController extends BaseDataBase {

    private static MusicBusiness = new MusicBusiness (

        new MusicDatabase(),
        new UserDatabase(),
        new AlbumDatabase(),
        new IdGenerator()
    );

    public async createMusic(req: Request, res:Response) {
        try {

            const newMusic: MusicInputDTO = {

                name: req.body.name,
                id_album: req.body.id_album 
            };
            const token = req.headers.authorization!
            const bandToken = new Authenticator().getData(token)

            if(bandToken.role !== UserRole.BANDA) {

                throw new Unauthorized("Unauthorized!!!!!")

            } else { 

                const music = await MusicController.MusicBusiness.createMusic(

                    newMusic.name,
                    newMusic.id_album
                )

                res.status(200).send({message:"música criada com sucesso"})

            }

        } catch (err) {
 
            res.status(err.errorCode || 400).send({ message: err.message || err.mysqlmessage} )
        }
    };
    public async getMyMusics(req: Request, res: Response){

        try{
            const token = req.headers.authorization || req.headers.Authorization as string
            const verifyBandToken = new Authenticator().getData(token)

            if (verifyBandToken.role !== UserRole.BANDA) {
            
                throw new Error("You have no permission for see bands");              
            };

            const musics = await MusicController.MusicBusiness.getMyMusics(verifyBandToken.id)
          
            res.status(200).send(musics)
        }
        catch (err) {
       
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    };
    public async getMusicsByAlbumId(req:Request, res:Response) {
        try{
            const token = req.headers.authorization || req.headers.Authorization as string
            const verifyBandToken = new Authenticator().getData(token)

            const albumId:GetMusicByIdInputDTO = {

                id_album:req.body.id_album
            }
            
            if (verifyBandToken.role !== UserRole.BANDA) {
            
                throw new Error("You have no permission for see bands");              
            };

            const allmusics = await MusicController.MusicBusiness.getMusicsByAlbumId(albumId.id_album)
          
            res.status(200).send(allmusics)
        }
        catch (err) {
           
            res.status(err.errorCode || 400).send({ message: err.message });
        }

    }

    public async getAllMusics(req: Request, res: Response){
        try{
            const allmusics = await MusicController.MusicBusiness.getAllMusics()
          
            res.status(200).send(allmusics)
        }
        catch (err) {
           
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
}