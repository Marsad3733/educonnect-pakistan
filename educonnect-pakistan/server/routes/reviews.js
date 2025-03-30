const express = require("express");
const router = express.Router();
const { addReview, getReviewsByTutor } = require("../controllers/reviewController");

router.post("/", addReview); // Submit a review
router.get("/:tutorId", getReviewsByTutor); // Get all reviews for a tutor

module.exports = router;
