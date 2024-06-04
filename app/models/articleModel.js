const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: {
      type: String,
      required: true,
  },
  description: {
      type: String,
      required: true,
  },
  category: {
      type: String,
      required: true,
      enum: ['Food', 'Education', 'Businessmen', 'Positions'],
  },
  slug: {
      type: String,
      required: true,
      unique: true,
  },
  createdAt: {
      type: Date,
      default: Date.now,
  },
});

module.exports = mongoose.model("Article", articleSchema);