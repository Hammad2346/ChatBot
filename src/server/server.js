import express from "express";
import dotenv from "dotenv";
import 'dotenv/config';
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const api="AIzaSyChaIGdYtIxTwWiJJVWy8NJP3BoTsj10MM"
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});