// models/Story.js
const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
  icon: String, 
  description: String,
  year: String
});

module.exports = mongoose.model("Story", storySchema);