import { Router } from "express";
import axios from "axios";
import commentModel from "../models/comment.model";
import { requireAuth, AuthRequest } from "../middlewares/auth.middleware";

const router = Router();

const COGNITIVE_ENDPOINT = process.env.COGNITIVE_SERVICES_ENDPOINT;
const COGNITIVE_KEY = process.env.COGNITIVE_SERVICES_KEY;

// Advanced feature: sentiment analysis via Azure Cognitive Services (Language service).
// Gracefully skipped if the environment variables aren't set, so this never blocks
// core functionality if Cognitive Services hasn't been provisioned yet.
async function analyzeSentiment(text: string): Promise<string | null> {
  if (!COGNITIVE_ENDPOINT || !COGNITIVE_KEY) return null;

  try {
    const response = await axios.post(
      `${COGNITIVE_ENDPOINT}/language/:analyze-text?api-version=2023-04-01`,
      {
        kind: "SentimentAnalysis",
        parameters: { modelVersion: "latest" },
        analysisInput: {
          documents: [{ id: "1", language: "en", text }],
        },
      },
      {
        headers: {
          "Ocp-Apim-Subscription-Key": COGNITIVE_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.results.documents[0].sentiment;
  } catch (error) {
    console.error("Sentiment analysis failed:", error);
    return null;
  }
}

// Get all comments for a video
router.get("/videos/:videoId/comments", async (req, res) => {
  const comments = await commentModel.find({ videoId: req.params.videoId });
  res.json(comments);
});

// Post a comment (and optional rating) - requires login, any role
router.post(
  "/videos/:videoId/comments",
  requireAuth,
  async (req: AuthRequest, res) => {
    const { text, rating } = req.body;
    const { videoId } = req.params;

    const sentiment = await analyzeSentiment(text);

    const newComment = new commentModel({
      videoId,
      userId: req.user?.id,
      text,
      rating,
    });
    await newComment.save();

    res.json({ ...newComment.toJSON(), sentiment });
  }
);

export default router;
