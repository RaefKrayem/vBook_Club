const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getChats,
  createChat,
  getClubChats,
} = require("../controllers/chatController");

router.route("/").get(protect, getChats).post(protect, createChat);

module.exports = router;
