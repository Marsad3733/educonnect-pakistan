const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: "Session" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: { type: Number, required: true },
  reviewText: { type: String }
});

module.exports = mongoose.model("Review", reviewSchema);
