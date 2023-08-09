const express = require("express");
const { createServer } = require("http");

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

const app = express();

// Mounting the serverless function as a middleware
const chatAPI = require("./api/chat");
app.use("/api/chat", chatAPI);

app.get("/", (req, res) => {
  res.send("Server is running.");
});

createServer(app).listen(PORT, (err) => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${PORT}`);
});
