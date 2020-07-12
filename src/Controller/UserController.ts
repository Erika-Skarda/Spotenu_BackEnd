import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import express, { Request, Response } from "express";



export class UserController {

    private static UserBusiness = new UserBusiness (
        new UserDatabase (),
        new Authenticator(),
        new HashManager (),
        new IdGenerator ()

    ) 
    
    public async signup(req:Request, res:Response) {

        try {

            const newUser = await UserController.UserBusiness.signup(

                req.body.name,
                req.body.email,
                req.body.nickname,
                req.body.password,
                req.body.role,

            )

            res.status(200).send(newUser)

        } catch(error) {

            res.status(error.errorCode || 400).send({ message: error.message})
        }

    }
    public async login(req: Request, res: Response) {

        try {

            const emailORPassword = req.body.email || req.body.nickname

            // const verifyEmail = await UserController.UserBusiness.verifyEmail(emailORPassword)

            // if(verifyEmail){

            //     const result = await UserController.UserBusiness.login(emailORPassword, req.body.password)
            // }

            // const verifyNickname = await UserController.UserBusiness.verifyNickname(emailORPassword)

            // if(verifyNickname){

                const result = await UserController.UserBusiness.login(emailORPassword, req.body.password)
            // }
           
          res.status(200).send({ message: "Hello" });

        } catch (err) {

          res.status(err.errorCode || 400).send({ message: err.message || err.mysqlmessage} )
        }
    }
}