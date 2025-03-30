const Review = require("../models/Review");
const User = require("../models/User");

const addReview = async (req, res) => {
  try {
    const { sessionId, studentId, tutorId, rating, reviewText } = req.body;

    const review = new Review({ sessionId, studentId, tutorId, rating, reviewText });
    await review.save();

    // Update tutor's average rating
    const reviews = await Review.find({ tutorId });
    const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

    await User.findByIdAndUpdate(tutorId, { rating: avgRating });

    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ error: "Failed to add review", details: err.message });
  }
};

const getReviewsByTutor = async (req, res) => {
  try {
    const tutorId = req.params.tutorId;
    const reviews = await Review.find({ tutorId }).populate("studentId", "name");
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = { addReview, getReviewsByTutor };
