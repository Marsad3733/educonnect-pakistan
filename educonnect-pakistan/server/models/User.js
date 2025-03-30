const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ["student", "tutor", "admin"], required: true },
  name: String,
  email: { type: String, unique: true },
  password: String,
  subjects: [String],
  hourlyRate: Number,
  city: String,
  profilePic: String,
  rating: { type: Number, default: 0 },
  availability: Object,
  verified: { type: Boolean, default: false },

  // ✅ Additional tutor profile fields
  bio: String,
  preferences: [String], // e.g., ["online", "in-person"]

  // ✅ Admin verification fields
  verificationStatus: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  verificationComment: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("User", userSchema);
