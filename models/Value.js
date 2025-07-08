// models/Value.js
const mongoose = require("mongoose");

const valueSchema = new mongoose.Schema({
  icon: String, 
  title: String,
  description: String
});

module.exports = mongoose.model("Value", valueSchema);