const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now, // Optional: Automatically sets the current date if not provided
  },
  time: {
    type: String,
    required: true,
  },
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
