import express, { Request, Response } from "express";
import * as C from "../Shared/Constants/EnvConstants";
import { IVideoData } from "../Shared/Interface/VideoData";
import * as HS from "../Shared/Constants/HTTPStatus";

const router = express.Router();
router.get("/getVideos", async (req: Request, res: Response) => {
  let videoData: IVideoData[] = [];
  try {
    const response = await fetch(
      `${C.GET_VIDEOS_ENDPOINT}part=player,statistics,snippet&key=${C.API_KEY}&chart=mostPopular&maxResults=20`
    );
    const json = await response.json();
    const videoItems = json.items;

    videoData = videoItems.map((video: any) => {
      // Retrieveing Videos Data.
      return {
        id: video.id,
        title: video.snippet.title,
        description: video.snippet.description,
        publishedAt: video.snippet.publishedAt,
        thumbnailUrl:
          video.snippet.thumbnails.maxres?.url ||
          video.snippet.thumbnails.high?.url ||
          video.snippet.thumbnails.medium?.url,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        commentCount: video.statistics.commentCount,
        channelTitle: video.snippet.channelTitle,
        channelId: video.snippet.channelId,
        channelThumbnailUrl: "",
      };
    });

    for (const video of videoData) {
      const channelResponse = await fetch(
        `${C.GET_CHANNEL_ENDPOINT}id=${video.channelId}&key=${C.API_KEY}&part=snippet`,
        {
          method: "GET",
        }
      );
      const channelJson = await channelResponse.json();
      video.channelThumbnailUrl =
        channelJson.items[0].snippet.thumbnails.high.url;
    }

    return res.status(HS.OK).json({ videoData }).end();
  } catch (error) {
    return res.status(HS.BADREQUEST).json({ error });
  }
});

export default router;
