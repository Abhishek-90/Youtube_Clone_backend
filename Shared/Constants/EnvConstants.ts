import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.port;
export const API_KEY = process.env.YOUTUBE_API_KEY;

// Youtube Endpoint constants
export const YOUTUBE_API = process.env.YOUTUBE_API;
export const GET_VIDEOS_ENDPOINT = process.env.YOUTUBE_GET_VIDEOS_ENDPOINT;
export const GET_CHANNEL_ENDPOINT = process.env.YOUTUBE_GET_CHANNEL_ENDPOINT;
export const GET_SEARCH_VIDEOS_ENDPOINT =
  process.env.YOUTUBE_GET_SEARCH_VIDEOS_ENDPOINT;
