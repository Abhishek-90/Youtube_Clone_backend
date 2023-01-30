import express, { Request, Response } from "express";
import * as C from "../Shared/Constants/EnvConstants";
import { getVideosFromAPI } from "./Functions/Videos";
import * as HS from "../Shared/Constants/HTTPStatus";

const router = express.Router();

router.get("/getVideos", async (req: Request, res: Response) => {
  const url: string = `${C.GET_VIDEOS_ENDPOINT}part=player,statistics,snippet&key=${C.API_KEY}&chart=mostPopular&maxResults=20`;
  const responseFromService = await getVideosFromAPI(url);

  if (responseFromService.status === HS.OK) {
    return res
      .status(responseFromService.status)
      .json({ videoData: responseFromService.videoData })
      .end();
  } else if (responseFromService.status === HS.BADREQUEST) {
    return res
      .status(responseFromService.status)
      .json({ error: responseFromService.error })
      .end();
  }
});

export default router;
