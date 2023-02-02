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
  try {
    const youtubeApiUrl: string = `${C.YOUTUBE_API}${C.GET_SEARCH_VIDEOS_ENDPOINT}part=snippet&key=${C.API_KEY}&maxResults=20&q=${req.query.searchKey}&type=videos`;

    const youtubeApiResponse = await fetch(youtubeApiUrl); //fetching data from youtube api as per search key
    const youtubeApiJsonResponse = await youtubeApiResponse.json(); // converting above received data to json format.
    const youtubeJsonItems = youtubeApiJsonResponse.items; //extracting items key from json data.
    const videoIds = youtubeJsonItems.map((item: any) => item.id.videoId); // extracting video ids from data
    const id = videoIds.join(","); //creating "," seperated id string

    const url: string = `${C.YOUTUBE_API}${C.GET_VIDEOS_ENDPOINT}part=player,statistics,snippet&key=${C.API_KEY}&maxResults=20&id=${id}`;
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
  } catch (error) {
    return res.status(HS.BADREQUEST).json({ error }).end();
  }
});

export default router;
