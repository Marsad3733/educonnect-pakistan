const express = require("express");
const router = express.Router();
const {
  getPopularSubjects,
  getSessionStats,
  getUsersByCity,
} = require("../controllers/reportController");

router.get("/subjects", getPopularSubjects);
router.get("/sessions", getSessionStats);
router.get("/users-by-city", getUsersByCity);

module.exports = router;
