import express from "express";
import { GenreController } from "../Controller/GenreController";

export const genreRouter = express.Router();

genreRouter.post("/create", new GenreController().createGenre);
genreRouter.get("", new GenreController().getGenre);