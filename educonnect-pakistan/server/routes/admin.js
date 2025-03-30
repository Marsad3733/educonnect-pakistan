const express = require("express");
const router = express.Router();
const { getPendingTutors, verifyTutor } = require("../controllers/adminController");

router.get("/tutors/pending", getPendingTutors);
router.put("/tutors/verify/:id", verifyTutor);

module.exports = router;
