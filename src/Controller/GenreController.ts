import { BaseDataBase } from "../Data/BaseDatabase";
import { GenreBusiness } from "../Business/GenreBusiness";
import { GenreDatabase } from "../Data/GenreDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import express, { Request, Response } from "express";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";
import { CreateGenreDTO } from "../DTO/GenreMusicalDTO";

export class GenreController extends BaseDataBase {
    
    private static GenreBusiness = new GenreBusiness (
        
        new GenreDatabase(),
        new Authenticator(),
        new HashManager(),
        new IdGenerator()
    )

    public async createGenre(req: Request, res:Response) {

        try {

            const newGenre: CreateGenreDTO = {

                music_genre : req.body.music_genre
            };

            const accessToken = req.headers.authorization as string;
            const adminToken = new Authenticator().getData(accessToken)

            if(adminToken.role !== UserRole.ADMIN) {
                
                throw new Unauthorized("Unauthorized!!!!!")

            } else {

                const genre = await GenreController.GenreBusiness.createGenre(newGenre.music_genre)
                
                res.status(200).send({ message: "Genre created", genre })
            }


        } catch(error) {

            res.status(error.errorCode || 400).send({ message: error.message})
        }
        await this.destroyConnection()
    }
}