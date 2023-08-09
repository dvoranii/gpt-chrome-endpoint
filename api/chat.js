import bodyParser from "body-parser";
import fetch from "node-fetch";
import express from "express";

const OPENAI_API_URL = "https://api.openai.com/v1/engines/davinci/completions";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello, this is the root endpoint!");
});

app.post("/api/chat", async (req, res) => {
  const highlightedText = req.body.highlightedText;

  if (!highlightedText) {
    return res.status(400).send("Highlighted text is missing");
  }

  console.log(highlightedText);

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      body: JSON.stringify({
        prompt: `Given the text "${highlightedText}", can you please help me get a more thorough understanding of the concepts?`,
        max_tokens: 150,
        temperature: 0.7,
      }),
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("OpenAI API call failed");
    }

    const data = await response.json();
    const gpt3Response =
      data.choices && data.choices[0] && data.choices[0].text;

    res.json({ response: gpt3Response.trim() });
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).send("Error calling OpenAI API");
  }
});

module.exports = app;
