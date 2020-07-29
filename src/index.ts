import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { userRouter } from "./Routes/UserRouter";
import { genreRouter } from "./Routes/GenreRouter";
import { albumRouter } from "./Routes/AlbumRouter";
import { musicRouter } from "./Routes/MusicRouter";
import cors from "cors";
import { playListRouter } from "./Routes/PlayListRouter";

dotenv.config();

export const app = express();
app.use(cors({
  origin:true
}));

app.use(express.json());

app.use("/user", userRouter);
app.use("/genre", genreRouter);
app.use("/album", albumRouter);
app.use("/music", musicRouter);
app.use("/playlist", playListRouter);

if(process.env.NODE_ENV !== "serveless") {
  const server = app.listen(process.env.PORT || 3000, () => {
      if(server) {
          const address = server.address() as AddressInfo
          console.log(`Server is running in http://localhost:${address.port}`)
      } else {
          console.log(`Failure`)
      }
  })  
}
//AKIAI7HBIS3INIDGPL2A
//U4vwODcH9yIRqsATQViH0GwB2tGqtiFEUjLMqnqV
//https://7nok4l82c2.execute-api.us-east-1.amazonaws.com/dev



