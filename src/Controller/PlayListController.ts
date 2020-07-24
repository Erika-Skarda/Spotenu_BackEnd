import { PlayListDatabase } from "../Data/PlayListDataBase";
import { MusicDatabase } from "../Data/MusicDatabase";
import { Authenticator } from "../Services/Authenticator";
import { IdGenerator } from "../Services/IdGenerator";
import { UserDatabase } from "../Data/UserDatabase";
import express, { Request, Response } from "express";
import { PlayListBusiness } from "../Business/PlayListBusiness";
import { UserController } from "./UserController";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";
import { CreatePlayListDTO } from "../DTO/PlayListDTO";
import { BaseDataBase } from "../Data/BaseDatabase";

export class PlayListController {

    private static PlaylistBusiness = new PlayListBusiness(
        new PlayListDatabase(),
        new UserDatabase(),
        new MusicDatabase(),
        new IdGenerator(),
        new Authenticator()
    )    

    public async createPlayList(req: Request, res: Response){
        try {
            const token = req.headers.authorization || req.headers.Authorization as string
            const name : CreatePlayListDTO = {

                name: req.body.name
            }

            const tokenAuth = new Authenticator().getData(token)

            if(tokenAuth.role !== UserRole.OUVINTE_PAGANTE) {

                throw new Unauthorized("Unauthorized!!!!!")

            }

            await PlayListController.PlaylistBusiness.createPlayList(name.name, tokenAuth.id)
            res.status(200).send({ message: "Playlist created!" })
        }
        catch (err) {
            
            res.status(err.errorCode || 400).send({ message: err.message });
        }
        await BaseDataBase.destroyConnection()
     
    };
    public async addMusic(req:Request, res:Response) {

        try {

            const token = req.headers.authorization || req.headers.Authorization as string
            const tokenAuth = new Authenticator().getData(token)

            const { id_playlist, id_music } = req.body

            if(tokenAuth.role !== UserRole.OUVINTE_PAGANTE) {

                throw new Unauthorized("Unauthorized!!!!!")
            };

            const createdBy = await PlayListController.PlaylistBusiness.addMusic(id_playlist, id_music, tokenAuth.id)

            res.status(200).send({ message: "You have successfully added the music" })

        } catch (error) {

            res.status(error.errorCode || 400).send( {message: error.message})
          }
    }
}