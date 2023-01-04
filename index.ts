import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as EC from "./Shared/Constants/EnvConstants";
import VideosRouter from "./Controller/Videos";

const app: Application = express();
app.use(express.json());
app.use(cors());

//To Check if server is up & running.
app.get("/", (req: Request, res: Response) => {
  res.json({ Message: "Youtube Clone Middleware working" });
});

// Getting Videos from youtube APIs
app.use("/videos", VideosRouter);

app.listen(EC.PORT, () => {
  console.log(`Youtube Middleware is running on port ${EC.PORT}`);
});
