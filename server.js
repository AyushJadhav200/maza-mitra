require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        lang: "en",
        country: "in",
        max: 5,
        apikey: process.env.GNEWS_API_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("API error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log('Server running on http://localhost:${PORT}');
});