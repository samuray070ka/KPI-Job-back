const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // <-- MUHIM
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