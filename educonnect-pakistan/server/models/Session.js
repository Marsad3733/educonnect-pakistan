const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  time: String,
  mode: { type: String, enum: ['online', 'in-person'] },
  status: { type: String, enum: ['pending', 'confirmed', 'completed', 'cancelled'], default: 'pending' },
  price: Number,
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
});

module.exports = mongoose.model("Session", sessionSchema);
