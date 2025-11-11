// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const summarizeRoute = require("./routes/summary");

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json({ limit: "2mb" }));

// Timeout middleware
app.use((req, res, next) => {
  res.setTimeout(20000, () => {
    console.log("Request timed out.");
    res.status(504).json({ error: "Request timed out." });
  });
  next();
});

const PORT = 3000;

app.use("/api/summarize", summarizeRoute);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
