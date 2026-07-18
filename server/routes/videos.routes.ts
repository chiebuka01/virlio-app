import { Router } from "express";
import { BlobServiceClient } from "@azure/storage-blob";
import videoModel from "../models/video.model";
import {
  requireAuth,
  requireCreator,
  AuthRequest,
} from "../middlewares/auth.middleware";

const router = Router();

const blobServiceClient = BlobServiceClient.fromConnectionString(
  process.env.AZURE_STORAGE_CONNECTION_STRING || ""
);
const containerClient = blobServiceClient.getContainerClient("videos");

// Advanced feature: simple in-memory caching for the video feed.
// Avoids hitting Cosmos DB on every request when the feed hasn't changed,
// demonstrating a caching strategy for scalability (per coursework criteria).
let feedCache: { data: any[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

function invalidateFeedCache() {
  feedCache = null;
}

router.get("/ping", (req, res) => {
  res.send("pong");
});

// Dashboard view: latest videos first (cached for 30s to reduce DB load)
router.get("/videos", async (req, res) => {
  const now = Date.now();
  if (feedCache && now - feedCache.timestamp < CACHE_TTL_MS) {
    return res.json(feedCache.data);
  }

  const videos = await videoModel.find().sort({ createdAt: -1 });
  feedCache = { data: videos, timestamp: now };
  res.json(videos);
});

// Search videos by title, description, or genre
router.get("/videos/search", async (req, res) => {
  const query = (req.query.q as string) || "";
  const videos = await videoModel
    .find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    })
    .sort({ createdAt: -1 });
  res.json(videos);
});

router.post(
  "/videos",
  requireAuth,
  requireCreator,
  async (req: AuthRequest, res) => {
    const { title, description, publisher, producer, genre, ageRating } =
      req.body;
    const { video } = req.files as any;

    const blobName = `${Date.now()}-${video.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.uploadData(video.data, {
      blobHTTPHeaders: { blobContentType: video.mimetype },
    });

    const newVideo = new videoModel({
      title,
      description,
      video: blockBlobClient.url,
      creatorId: req.user?.id,
      publisher,
      producer,
      genre,
      ageRating,
    });

    await newVideo.save();
    invalidateFeedCache();
    res.json(newVideo);
  }
);

export default router;
