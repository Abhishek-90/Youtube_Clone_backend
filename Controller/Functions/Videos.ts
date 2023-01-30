import { IVideoData } from "../../Shared/Interface/VideoData";
import * as C from "../../Shared/Constants/EnvConstants";
import * as HS from "../../Shared/Constants/HTTPStatus";

export const getVideosFromAPI = async (url: string) => {
  try {
    const response = await fetch(url);
    const json = await response.json();
    const videoItems = json.items;

    let videoData: IVideoData[] = videoItems.map((video: any) => {
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

    return { status: HS.OK, videoData };
  } catch (error) {
    return { status: HS.BADREQUEST, error };
  }
};
