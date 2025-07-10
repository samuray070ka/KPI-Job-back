const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  number: String,
  label: {
    uz: String,
    ru: String,
    en: String
  }
});

module.exports = mongoose.model("Result", resultSchema);
