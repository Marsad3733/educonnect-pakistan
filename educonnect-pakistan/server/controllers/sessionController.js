const Session = require("../models/Session");

// 📌 Student books a session
const createSession = async (req, res) => {
  try {
    const { studentId, tutorId, date, time, mode, price } = req.body;
    const session = new Session({ studentId, tutorId, date, time, mode, price });
    await session.save();
    res.status(201).json({ message: "Session booked successfully", session });
  } catch (error) {
    res.status(500).json({ error: "Failed to book session", details: error.message });
  }
};

// 📥 Tutor: Get all sessions
const getTutorSessions = async (req, res) => {
  try {
    const sessions = await Session.find({ tutorId: req.params.tutorId }).populate("studentId");
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tutor sessions" });
  }
};

// ✅ Accept session
const acceptSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, { status: "confirmed" }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to accept session" });
  }
};

// ❌ Decline session
const declineSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to decline session" });
  }
};

// ✅ Mark session as completed
const completeSession = async (req, res) => {
  try {
    const session = await Session.findByIdAndUpdate(req.params.id, { status: "completed", paymentStatus: "paid" }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: "Failed to complete session" });
  }
};

// 📊 Earnings summary
const getTutorEarnings = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;

    const sessions = await Session.find({
      tutorId,
      status: "completed",
      paymentStatus: "paid",
    });

    let total = 0;
    let thisWeek = 0;
    let thisMonth = 0;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    sessions.forEach((session) => {
      const sessionDate = new Date(session.date);
      total += session.price;

      if (sessionDate >= startOfWeek) thisWeek += session.price;
      if (sessionDate >= startOfMonth) thisMonth += session.price;
    });

    res.json({ total, thisWeek, thisMonth });
  } catch (err) {
    res.status(500).json({ error: "Failed to calculate earnings" });
  }
};

module.exports = {
  createSession,
  getTutorSessions,
  acceptSession,
  declineSession,
  completeSession,
  getTutorEarnings, // ✅ Added
};
