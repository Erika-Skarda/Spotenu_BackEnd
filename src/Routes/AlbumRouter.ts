import express from "express";
import { AlbumController } from "../Controller/AlbumController";

export const albumRouter = express.Router();

albumRouter.post("/create", new AlbumController().createAlbum);
albumRouter.get("", new AlbumController().getAlbunsByBandId)
albumRouter.delete("/delete/:id", new AlbumController().deleteAlbum);