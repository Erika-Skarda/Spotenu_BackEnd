import express from "express";
import { UserController } from "../Controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup", new UserController().signup);
userRouter.post("/login", new UserController().login);
userRouter.put("/approve", new UserController().approveBand);
userRouter.get("/bandpage", new UserController().getUsersByTypeAndSortAndPage);
userRouter.get("/role", new UserController().getUsersByRole);
userRouter.get("/band", new UserController().getAllBands);