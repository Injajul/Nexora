import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.routes.js";
import playlistRouter from "./routes/playlist.route.js";
import commentRouter from "./routes/comment.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express();

// ===============================
// 🌐 CORS Configuration (manual switch)
// ===============================
const allowedOrigins = [
  // "http://localhost:5173", 
  // "https://nexora-mauve.vercel.app", 
  "https://nexora-gfbk.vercel.app", 
  
];

console.log("✅ Allowed origins:", allowedOrigins);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/comments", commentRouter);
app.use("/api/subscriptions", subscriptionRouter);

export default app;
