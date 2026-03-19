require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cron = require("node-cron");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const News = require("./models/News");
const ai = require("./utils/ai");
const auth = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"));

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign({ user: username }, process.env.JWT_SECRET);
    return res.json({ token });
  }

  res.sendStatus(401);
});

// AUTO NEWS FETCH
async function fetchNews() {
  const res = await axios.get(
    `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.NEWS_API}`
  );

  for (let item of res.data.articles) {
    let exists = await News.findOne({ title: item.title });

    if (!exists) {
      const content = await ai(item.description || item.title);

      await News.create({
        title: item.title,
        content,
        image: item.urlToImage || "",
        time: item.publishedAt
      });
    }
  }
}

// Every 10 mins
cron.schedule("*/10 * * * *", fetchNews);

// APIs
app.get("/news", async (req, res) => {
  const data = await News.find().sort({ time: -1 });
  res.json(data);
});

app.post("/like/:id", async (req, res) => {
  await News.findByIdAndUpdate(req.params.id, {
    $inc: { likes: 1 }
  });
  res.send("liked");
});

// ADMIN
app.delete("/news/:id", auth, async (req, res) => {
  await News.findByIdAndDelete(req.params.id);
  res.send("deleted");
});

app.put("/news/:id", auth, async (req, res) => {
  await News.findByIdAndUpdate(req.params.id, req.body);
  res.send("updated");
});

app.listen(5000, () => console.log("Server running"));