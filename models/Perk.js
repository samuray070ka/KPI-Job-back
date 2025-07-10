const mongoose = require("mongoose");

const perkSchema = new mongoose.Schema({
  label: {
    uz: String,
    ru: String,
    en: String
  }
});

module.exports = mongoose.model("Perk", perkSchema);
