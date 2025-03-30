const express = require("express");
const router = express.Router();
const {
  getFilteredTutors,
  getTutorById,
  updateTutorProfile
} = require("../controllers/tutorController");

// Route to get filtered tutors
router.get("/", getFilteredTutors);

// Route to get a specific tutor's profile
router.get("/:id", getTutorById);

// Route to update a tutor's profile
router.put("/:id", updateTutorProfile);

module.exports = router;
