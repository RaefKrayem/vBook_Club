const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getFriends,
  getFriend,
  removeFriend,
} = require("../controllers/friendController");

router.get("/", protect, getFriends);
router.get("/friend", protect, getFriend);
router.delete("/remove", protect, removeFriend);

module.exports = router;
