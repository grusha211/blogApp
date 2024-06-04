const Article = require("../models/articleModel");
const User = require('../models/userModel');

class articleController {
  static async createArticle(req, res) {
    const { title, description, category, slug } = req.body;
    try {
      const article = new Article({ title, description, category, slug });
      await article.save();
      res.status(201).json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async getAllArticles(req, res) {
    try {
      const articles = await Article.find().sort({ createdAt: -1 });
      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async getArticleBySlug(req, res) {
    try {
      const article = await Article.findOne({ slug: req.params.slug });
      if (!article) return res.status(404).json({ message: 'Article not found' });
      res.status(200).json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async updateArticle(req, res) {
    const { title, description, category, slug } = req.body;
    try {
      const article = await Article.findOneAndUpdate(
        { slug: req.params.slug },
        { title, description, category, slug },
        { new: true }
      );
      if (!article) return res.status(404).json({ message: 'Article not found' });
      res.status(200).json(article);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async deleteArticle(req, res) {
    try {
      const article = await Article.findOneAndDelete({ slug: req.params.slug });
      if (!article) return res.status(404).json({ message: 'Article not found' });
      res.status(200).json({ message: 'Article deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
  static async searchArticles(req, res) {
    const { query } = req.query;
    try {
      const articles = await Article.find({
        $or: [
          { title: new RegExp(query, 'i') },
          { description: new RegExp(query, 'i') },
          { category: new RegExp(query, 'i') },
        ],
      }).sort({ createdAt: -1 });
      res.status(200).json(articles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = articleController;