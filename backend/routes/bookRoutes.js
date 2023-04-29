const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getBooks,
  saveBook,
  unsaveBook,
} = require("../controllers/bookController");

router.get("/", protect, getBooks);
router.post("/", protect, saveBook);
router.delete("/", protect, unsaveBook);

module.exports = router;
