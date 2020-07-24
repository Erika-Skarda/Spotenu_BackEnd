import express from "express";
import { PlayListController } from "../Controller/PlayListController";

export const playListRouter = express.Router();

playListRouter.post("/create", new PlayListController().createPlayList);
playListRouter.post("/add", new PlayListController().addMusic);