const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  icon: String,
  title: {
    uz: String,
    ru: String,
    en: String
  },
  description: {
    uz: String,
    ru: String,
    en: String
  }
});

module.exports = mongoose.model("Value", valueSchema);
