import express from "express";
import dotenv from "dotenv";
import 'dotenv/config';
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const api=process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(api);

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(message);
    res.json({ reply: result.response.text() });
  } catch (err) {
    console.error("AI request failed:", err);
    res.status(500).json({ error: "AI request failed" });
  }
});

app.post("/api/title", async (req, res) => {
  try {
    const { messages } = req.body;
    const chatText = messages
      .map(m => `${m.role}: ${m.text}`)
      .join("\n");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });
    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate ONE short 2–5 word title that BEST describes this chat. Do NOT list multiple options. Return ONLY the title, nothing else:\n\n${chatText}`
            }
          ]
        }
      ]
    });

    res.json({ reply: result.response.text() });

  } catch (error) {
    console.log("ai error", error);
    res.status(500).json({ error: "AI error" });
  }
});



app.listen(5000, () => {
  console.log("Server is running on port 5000");
});