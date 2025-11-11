const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  try {
    const { text, style } = req.body;
    let content = text;

    // Detect if input is a URL
    const isURL = /^https?:\/\/\S+$/i.test(text.trim());

    if (isURL) {
      let html;
      try {
        const response = await axios.get(text, {
          headers: { "User-Agent": "Mozilla/5.0" },
        });
        html = response.data;
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Failed to fetch URL. Try another link." });
      }

      const $ = cheerio.load(html);
      // Try <article> first, fallback to <p>
      let articleText = $("article p")
        .map((i, el) => $(el).text())
        .get()
        .join(" ");
      if (!articleText) {
        articleText = $("p")
          .map((i, el) => $(el).text())
          .get()
          .join(" ");
      }

      if (!articleText.trim()) {
        return res.status(400).json({
          error:
            "Couldn't extract readable content from this website. Please copy the text manually from the site and paste it here.",
          suggestManual: true,
        });
      }

      content = articleText.slice(0, 8000); // limit size
    }

    // Determine style prompt
    let stylePrompt;
    switch (style) {
      case "bullet":
        stylePrompt = "Summarize the text into concise bullet points.";
        break;
      case "casual":
        stylePrompt =
          "Summarize the text casually as if explaining to a friend.";
        break;
      case "headline":
        stylePrompt = "Summarize the text in short, bold headlines.";
        break;
      case "formal":
        stylePrompt = "Summarize the text in a formal and professional tone.";
        break;
      default:
        stylePrompt =
          "Summarize the text concisely while keeping all key details.";
    }

    // Generate summary with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: stylePrompt },
        { role: "user", content },
      ],
    });

    const summary =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "No summary generated.";
    res.json({ summary });
  } catch (error) {
    console.error("Summarization Error:", error.message);
    res
      .status(500)
      .json({ error: "Failed to summarize content. Try again later." });
  }
});

module.exports = router;
