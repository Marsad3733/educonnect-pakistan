const express = require("express");
const router = express.Router();
const {
  createSession,
  getTutorSessions,
  acceptSession,
  declineSession,
  completeSession,
  getTutorEarnings, // ✅ Added
} = require("../controllers/sessionController");
const Session = require("../models/Session");

// Student books a session
router.post("/", createSession);

// Student views their sessions
router.get("/student/:id", async (req, res) => {
  try {
    const sessions = await Session.find({ studentId: req.params.id })
      .populate("tutorId", "name")
      .sort({ date: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
});

// Student cancels a session
router.patch("/cancel/:id", async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to cancel session" });
  }
});

// Tutor: Get their sessions
router.get("/tutor/:tutorId", getTutorSessions);

// Tutor: Accept / Decline / Complete
router.put("/accept/:id", acceptSession);
router.put("/decline/:id", declineSession);
router.put("/complete/:id", completeSession);

// 📊 Tutor: Earnings summary
router.get("/earnings/:tutorId", getTutorEarnings); // ✅ New route

module.exports = router;
