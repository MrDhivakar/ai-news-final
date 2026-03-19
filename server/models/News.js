const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  time: String,
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 }
});

module.exports = mongoose.model("News", newsSchema);