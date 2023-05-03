const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getMessages,
  sendMessage,
  deleteMessage,
} = require("../controllers/messageController");

router.get("/:id", protect, getMessages);
router.post("/send", protect, sendMessage);
router.delete("/delete", protect, deleteMessage);

module.exports = router;
