const express = require("express");
const router = express.Router();
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");

router.post("/", addToWishlist);
router.get("/:studentId", getWishlist);
router.delete("/:studentId/:tutorId", removeFromWishlist);

module.exports = router;
