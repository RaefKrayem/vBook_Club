const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMessages,
  sendMessage,
  deleteMessage,
  getFriendMessages,
} = require("../controllers/messageController");

router.get("/message/:id", protect, getMessages);
router.get("/friend/:friend_id", protect, getFriendMessages);
router.post("/send", protect, sendMessage);
router.delete("/delete", protect, deleteMessage);

module.exports = router;
