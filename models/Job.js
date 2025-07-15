const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

// 🔄 Slug yaratish middleware (faqat title o'zgarganda)
jobSchema.pre('validate', function (next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '') // maxsus belgilarni olib tashlash
      .replace(/\s+/g, '-')          // bo'sh joylarni - ga almashtirish
      .trim();
  }
  next();
});

module.exports = mongoose.model("Job", jobSchema);