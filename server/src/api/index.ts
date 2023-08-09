import express from "express";
import isUrl from "is-url";

import { scrapeUrl } from "../helpers/webScraper";
import { chatCompletion } from "../helpers/openai";
import { SYSTEM_MESSAGE } from "../helpers/prompts";
import { parseModelResponse } from "../helpers/validate-response";
import { NewsModel } from "../helpers/db";

const router = express.Router();

router.get("/news", async (req, res) => {
  try {
    const analyzedNews = await NewsModel.find().limit(10).exec();

    res.status(200).json({
      data: analyzedNews,
    });
  } catch (err) {
    res.status(500).json({
      data: "Something went wrong.",
    });
  }
});

router.post("/analyze", async (req, res) => {
  try {
    const content = req.body.content;

    const modelResponse = await chatCompletion([
      { role: "system", content: SYSTEM_MESSAGE },
      { role: "user", content },
    ]);

    if (modelResponse === undefined) throw new Error();

    const parsedResponse = parseModelResponse(modelResponse);

    const newsDocument = NewsModel.create(parsedResponse);

    await (await newsDocument).save();

    res.status(200).json({
      data: parsedResponse,
    });
  } catch (err) {
    res.status(500).json({
      data: "Something went wrong.",
    });
  }
});

export default router;
