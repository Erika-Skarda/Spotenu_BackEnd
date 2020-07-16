import { MusicController } from "../Controller/MusicController";
import express from "express";

export const musicRouter = express.Router();

musicRouter.post("/create", new MusicController().createMusic);