import { MusicController } from "../Controller/MusicController";
import express from "express";

export const musicRouter = express.Router();

musicRouter.post("/create", new MusicController().createMusic);

musicRouter.get("/mymusics",new MusicController().getMyMusics)
musicRouter.get("/all",new MusicController().getAllMusics)

musicRouter.get("/idalbum", new MusicController().getMusicsByAlbumId)