// models/Perk.js
const mongoose = require("mongoose");

const perkSchema = new mongoose.Schema({
  label: String
});

module.exports = mongoose.model("Perk", perkSchema);