const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentController");

router.get("/", protect, getComments);
router.post("/add", protect, addComment);
router.delete("/delete", protect, deleteComment);

module.exports = router;
