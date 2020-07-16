import { BaseDataBase } from "../Data/BaseDatabase";
import { MusicBusiness } from "../Business/MusicBusiness";
import { MusicDatabase } from "../Data/MusicDatabase";
import { UserDatabase } from "../Data/UserDatabase";
import { AlbumDatabase } from "../Data/AlbumDatabase";
import { IdGenerator } from "../Services/IdGenerator";
import express, { Request, Response } from "express";
import { MusicInputDTO } from "../DTO/MusicDTO";
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

                res.status(200).send(music)

            }

        } catch (err) {
 
            res.status(err.errorCode || 400).send({ message: err.message || err.mysqlmessage} )
        }
    }
}