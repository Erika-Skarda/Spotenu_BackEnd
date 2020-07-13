import express from "express";
import { UserController } from "../Controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signup);
userRouter.post("/login", new UserController().login);
userRouter.put("/approve", new UserController().approveBand)