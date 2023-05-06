const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getChats,
  // accessChat,
  getClubChats,
} = require("../controllers/chatController");

router.route("/").get(protect, getChats);

module.exports = router;
