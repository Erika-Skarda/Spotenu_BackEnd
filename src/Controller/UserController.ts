import { UserBusiness } from "../Business/UserBusiness";
import { UserDatabase } from "../Data/UserDatabase";
import { Authenticator } from "../Services/Authenticator";
import { HashManager } from "../Services/HashManager";
import { IdGenerator } from "../Services/IdGenerator";
import express, { Request, Response } from "express";
import { SignupInputDTO, BandOrderDTO } from "../DTO/UserDTO";
import { BaseDataBase } from "../Data/BaseDatabase";
import { UserRole } from "../Model/UserModel";
import { Unauthorized } from "../Errors/Unauthorized";

export class UserController extends BaseDataBase {
    
    private static UserBusiness = new UserBusiness (
        new UserDatabase (),
        new Authenticator(),
        new HashManager (),
        new IdGenerator ()

    ) 
    
    public async signup(req:Request, res:Response) {

        try {

            const newUser:SignupInputDTO = { 

                name: req.body.name,
                email: req.body.email,
                nickname: req.body.nickname,
                password: req.body.password,
                role: req.body.role,
                description_band: req.body.description_band

            }

            if(req.body.role === "admin" ) {

                const token = req.headers.authorization as string;
                const verifyToken = new Authenticator().getData(token);
                
                if(verifyToken.role !== UserRole.ADMIN) {

                    throw new Unauthorized("You can't do this") 
                }
            }
            
            const userInfo = await UserController.UserBusiness.signup(

                newUser.name,
                newUser.email,
                newUser.nickname,
                newUser.password,
                newUser.role,
                newUser.description_band

            )

            res.status(200).send(userInfo)

        } catch(error) {

            res.status(error.errorCode || 400).send({ message: error.message})
        }
        await this.destroyConnection();

    }
    public async login(req: Request, res: Response) {

        try {

         const emailOrNickname= req.body.email || req.body.nickname

            const result = await UserController.UserBusiness.login(
                emailOrNickname, 
                req.body.password
            );
       
          res.status(200).send({ result });

        } catch (err) {
 
          res.status(err.errorCode || 400).send({ message: err.message || err.mysqlmessage} )
        }

         await this.destroyConnection()
    }
    public async approveBand(req:Request, res:Response) {

        try {
            
            const { id }= req.body;

            const accesToken = req.headers.authorization as string;
            const verifyToken = new Authenticator().getData(accesToken);

            if(verifyToken.role !== UserRole.ADMIN) {

                throw new Unauthorized("You can't do this") 
            }

           const bandAprroved = await UserController.UserBusiness.approveBand(id)

            res.status(200).send(bandAprroved)
            
        }  catch(error) {

            res.status(error.errorCode || 400).send({ message: error.message})
        }
        await this.destroyConnection()
    }

    public async getUsersByTypeAndSortAndPage(req: Request, res:Response) {

        try {
            const accesToken = req.headers.authorization as string;
            const verifyToken = new Authenticator().getData(accesToken);

            if(verifyToken.role !== UserRole.ADMIN) {

                throw new Unauthorized("You can't do this") 

            } else {

            const userType = req.query.role as string 
            
            const order: BandOrderDTO = {

                by: "name",
                type: "ASC"
            };
            const page : number = Number(req.body.page) >= 1 ? Number(req.body.page) : 1;
            
            if(req.body.orderBy === "email" || req.body.orderBy === "nickname") {

                order.by = req.body.orderBy
            }

            if(req.body.orderType === "DESC") {

                order.type = req.body.orderType;
            }

            const result = await UserController.UserBusiness.getUsersByTypeAndSortAndPage(userType, order, page);

            res.status(200).send(result);

            }
         } catch (error) {

        res.status(error.errorCode || 400).send({ message: error.message || error.mysqlmessage})
        }

    }
    
    public async getUsersByRole(req: Request, res: Response) {

        try {
            const token = req.headers.authorization as string
            const verifyAdminToken = new Authenticator().getData(token)

            if (verifyAdminToken.role !== UserRole.ADMIN) {
                
                throw new Error("You have no permission for see bands");              
            };

            const role = req.body.role 
            const result = await UserController.UserBusiness.getUsersByRole(role);

            return res.status(200).send(result);
        } catch (error) {
            res.status(error.errorCode || 400).send( {message: error.message})
          }
    }

    
}