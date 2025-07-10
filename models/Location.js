const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  title: {
    uz: String,
    ru: String,
    en: String
  },
  description: {
    uz: String,
    ru: String,
    en: String
  },
  mapEmbedUrl: String
});

module.exports = mongoose.model("Location", locationSchema);
