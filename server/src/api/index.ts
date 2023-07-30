import express from "express";
import { scrapeUrl } from "../helpers/webScraper";
import { chatCompletion } from "../helpers/openai";
import { HIGHLIGHTS_SYSTEM_MESSAGE } from "../helpers/prompts";

const router = express.Router();

router.post("/analyze", async (req, res) => {
  try {
    const content = await scrapeUrl(req.body.url);
    const sag = await chatCompletion([
      { role: "system", content: HIGHLIGHTS_SYSTEM_MESSAGE },
      { role: "user", content },
    ]);

    res.status(200).json({
      data: sag,
    });
  } catch (err) {
    res.status(500).json({
      data: "Something went wrong.",
    });
  }
});

export default router;
