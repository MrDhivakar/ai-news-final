require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");
const cron = require("node-cron");

const News = require("./models/News");
const User = require("./models/User");
const rewriteNews = require("./utils/aiRewrite");

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);

// ROOT
app.get("/", (req, res) => res.send("API Running 🚀"));

// REGISTER
app.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin123") {
    return res.json({ role: "admin", token: "admin-token" });
  }

  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ role: "user", token: "user-token" });
  } else {
    res.status(401).json({ msg: "Invalid" });
  }
});

// GET NEWS
app.get("/news", async (req, res) => {
  const news = await News.find().sort({ createdAt: -1 });
  res.json(news);
});

// LIKE
app.post("/like/:id", async (req, res) => {
  const n = await News.findById(req.params.id);
  n.likes++;
  await n.save();
  res.json(n);
});

// COMMENT
app.post("/comment/:id", async (req, res) => {
  const n = await News.findById(req.params.id);
  n.comments.push(req.body);
  await n.save();
  res.json(n);
});

// AUTO NEWS
async function fetchNews() {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API_KEY}`
  );

  for (let a of res.data.articles.slice(0, 5)) {
    const content = await rewriteNews(a.description || a.title);

    await News.create({
      title: a.title,
      content,
      image: a.urlToImage
    });
  }
}

// CRON (1 hour)
cron.schedule("0 * * * *", () => {
  fetchNews();
});

// MANUAL
app.get("/auto-news", async (req, res) => {
  await fetchNews();
  res.send("News Added");
});

app.listen(5000, () => console.log("Server running 🔥"));