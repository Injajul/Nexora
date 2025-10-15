import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

// Import Routes
import userRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.routes.js";
import playlistRouter from "./routes/playlist.route.js";
import commentRouter from "./routes/comment.route.js";
import subscriptionRouter from "./routes/subscription.route.js";

const app = express();

// ===============================
// 🌐 CORS Configuration
// ===============================
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [process.env.PROD_FRONTEND_URL]
    : [process.env.LOCAL_FRONTEND_URL];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ===============================
// 🧩 Middlewares
// ===============================
app.use(express.json());
app.use(cookieParser());

// ===============================
// 🛣️ Routes
// ===============================
app.use("/api/users", userRouter);
app.use("/api/videos", videoRouter);
app.use("/api/playlists", playlistRouter);
app.use("/api/comments", commentRouter);
app.use("/api/subscriptions", subscriptionRouter);


// 🚀 Export app
export default app;
