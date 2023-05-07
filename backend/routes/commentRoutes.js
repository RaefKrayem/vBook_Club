const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getComments,
  addComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/all", protect, getComments);
router.post("/add", protect, addComment);
router.delete("/delete/:id", protect, deleteComment);

module.exports = router;
