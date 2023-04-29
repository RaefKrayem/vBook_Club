const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getClubs,
  getClub,
  joinClub,
  leaveClub,
  getMyClubs,
  createClub,
} = require("../controllers/clubController");

router.get("/", protect, getClubs);
router.post("/", protect, createClub);
router.get("/club", protect, getClub);
router.get("/myClubs", protect, getMyClubs);
router.post("/join", protect, joinClub);
router.delete("/leave", protect, leaveClub);

module.exports = router;
