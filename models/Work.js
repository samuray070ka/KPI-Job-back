// models/WorkImage.js
const mongoose = require("mongoose");

const workImageSchema = new mongoose.Schema({
  imageUrl: String,
});

module.exports = mongoose.model("Work", workImageSchema);