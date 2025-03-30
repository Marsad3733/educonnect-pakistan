const User = require("../models/User");

// Get all tutors pending verification
const getPendingTutors = async (req, res) => {
  try {
    const tutors = await User.find({ role: "tutor", verificationStatus: "pending" });
    res.json(tutors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pending tutors" });
  }
};

// Approve/Reject tutor
const verifyTutor = async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const updated = await User.findByIdAndUpdate(
      id,
      { verificationStatus: status, verificationComment: comment },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update tutor status" });
  }
};

module.exports = {
  getPendingTutors,
  verifyTutor,
};
