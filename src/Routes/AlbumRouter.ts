import express from "express";
import { AlbumController } from "../Controller/AlbumController";

export const albumRouter = express.Router();

albumRouter.post("/create", new AlbumController().createAlbum);
albumRouter.delete("/delete", new AlbumController().deleteAlbum);