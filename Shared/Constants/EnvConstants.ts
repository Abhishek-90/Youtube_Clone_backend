import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.port;
export const API_KEY = process.env.YOUTUBE_API_KEY;
