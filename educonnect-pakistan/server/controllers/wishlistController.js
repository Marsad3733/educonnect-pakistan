const Wishlist = require("../models/Wishlist");

// Add tutor to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { studentId, tutorId } = req.body;

    const exists = await Wishlist.findOne({ studentId, tutorId });
    if (exists) return res.status(409).json({ message: "Already in wishlist" });

    const item = await Wishlist.create({ studentId, tutorId });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

// Get wishlist for a student
exports.getWishlist = async (req, res) => {
  try {
    const { studentId } = req.params;
    const wishlist = await Wishlist.find({ studentId }).populate("tutorId");
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to get wishlist" });
  }
};

// Remove tutor from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { studentId, tutorId } = req.params;
    await Wishlist.findOneAndDelete({ studentId, tutorId });
    res.status(200).json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};
