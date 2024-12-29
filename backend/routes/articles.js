const express = require("express");
const Article = require("../DBModel/NewsArticle");

const router = express.Router();

// To Create a new article
router.post("/create", async (req, res) => {
  try {
    const { heading, image, description, date, time } = req.body;
    const newArticle = new Article({ heading, image, description, date, time });
    await newArticle.save();
    res.status(201).json({ message: "Article created successfully", article: newArticle });
  } catch (error) {
    res.status(500).json({ message: "Error creating article", error: error.message });
  }
});

// To Get list of all available articles
router.get("/list", async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error: error.message });
  }
});

// To Get a single article with help of ID
router.get("/view/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: "Error fetching article", error: error.message });
  }
});

// To Update an article with help of ID
router.put("/update/:id", async (req, res) => {
  try {
    const { heading, image, description, date, time } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { heading, image, description, date, time },
      { new: true, runValidators: true }
    );
    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
  } catch (error) {
    res.status(500).json({ message: "Error updating article", error: error.message });
  }
});

// To Delete an article with help of ID
router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedArticle = await Article.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting article", error: error.message });
  }
});

module.exports = router;
