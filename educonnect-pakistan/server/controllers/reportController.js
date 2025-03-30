const User = require("../models/User");
const Session = require("../models/Session");

// Get popular subjects
const getPopularSubjects = async (req, res) => {
  try {
    const result = await User.aggregate([
      { $match: { role: "tutor" } },
      { $unwind: "$subjects" },
      { $group: { _id: "$subjects", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to get subjects" });
  }
};

// Get session stats
const getSessionStats = async (req, res) => {
  try {
    const total = await Session.countDocuments();
    const completed = await Session.countDocuments({ status: "completed" });
    const cancelled = await Session.countDocuments({ status: "cancelled" });

    res.json({ total, completed, cancelled });
  } catch (err) {
    res.status(500).json({ error: "Failed to get session stats" });
  }
};

// Get users by city
const getUsersByCity = async (req, res) => {
  try {
    const result = await User.aggregate([
      { $match: { city: { $exists: true, $ne: null } } },
      { $group: { _id: "$city", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to get users by city" });
  }
};

module.exports = {
  getPopularSubjects,
  getSessionStats,
  getUsersByCity,
};
