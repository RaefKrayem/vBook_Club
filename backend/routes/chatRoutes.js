const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getChats,
  // accessChat,
  getClubChats,
  createChat,
} = require("../controllers/chatController");

router.route("/").get(protect, getChats);
router.post("/", protect, createChat);

module.exports = router;
