import express, { Request, Response } from "express";
import * as C from "../Shared/Constants/EnvConstants";
import { getVideosFromAPI } from "./Functions/Videos";
import * as HS from "../Shared/Constants/HTTPStatus";

const router = express.Router();

router.get("/getVideos", async (req: Request, res: Response) => {
  const url: string = `${C.YOUTUBE_API}${C.GET_VIDEOS_ENDPOINT}part=player,statistics,snippet&key=${C.API_KEY}&chart=mostPopular&maxResults=20`;
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

router.get("/searchVideos", async (req: Request, res: Response) => {
  const youtubeApiUrl: string = `${C.YOUTUBE_API}${C.GET_SEARCH_VIDEOS_ENDPOINT}part=snippet&key=${C.API_KEY}&maxResults=20&q=${req.body.searchKey}&type=videos`;

  const youtubeApiResponse = await fetch(youtubeApiUrl);
  const youtubeApiJsonResponse = await youtubeApiResponse.json();
  const youtubeJsonItems = youtubeApiJsonResponse.items;
  const videoIds = youtubeJsonItems.map((item: any) => item.id.videoId);

  const url: string = `${C.YOUTUBE_API}${C.GET_VIDEOS_ENDPOINT}part=player,statistics,snippet&key=${C.API_KEY}&chart=mostPopular&maxResults=20`;
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
