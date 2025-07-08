// models/Result.js
const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  number: String,
  label: String
});

module.exports = mongoose.model("Result", resultSchema);