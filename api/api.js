const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.post("/api/chat", (req, res) => {
  const highlightedText = req.body.highlightedText;

  if (!highlightedText) {
    return res.status(400).send("Highlighted text is missing");
  }

  console.log(highlightedText);
  // TODO: Make an API call to OpenAI with the highlighted text
  // and return the response

  res.json({ response: "Your API response will go here" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
