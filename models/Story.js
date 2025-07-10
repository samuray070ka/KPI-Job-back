const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  description: {
    uz: String,
    ru: String,
    en: String
  },
  year: String
});

module.exports = mongoose.model("Story", storySchema);
