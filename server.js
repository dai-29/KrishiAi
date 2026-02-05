import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const systemPrompt = `
You are an agriculture help assistant for Indian farmers.
Always reply in the user's selected language: ${language}.
Be concise, practical, and safe. If unsure, say you are not sure.
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt.trim() },
          { role: "user", content: message }
        ],
        temperature: 0.4
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data?.error?.message || "OpenAI error" });
    }

    const reply = data.choices?.[0]?.message?.content || "No response";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
