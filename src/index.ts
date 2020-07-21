import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { userRouter } from "./Routes/UserRouter";
import { genreRouter } from "./Routes/GenreRouter";
import { albumRouter } from "./Routes/AlbumRouter";
import { musicRouter } from "./Routes/MusicRouter";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({
  origin:true
}))
app.use(express.json());

app.use("/user", userRouter);
app.use("/genre", genreRouter);
app.use("/album", albumRouter);
app.use("/music", musicRouter);

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});