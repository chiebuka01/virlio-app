import express from "express";
import fileUpload from "express-fileupload";
import cors from "cors";

import videoRoutes from "./routes/videos.routes";
import authRoutes from "./routes/auth.routes";
import commentRoutes from "./routes/comments.routes";

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: false,
    safeFileNames: true,
  })
);

app.use(videoRoutes);
app.use(authRoutes);
app.use(commentRoutes);

export default app;
