// models/Location.js
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
  title: String,
  description: String,
  mapEmbedUrl: String
});

module.exports = mongoose.model("Location", locationSchema);