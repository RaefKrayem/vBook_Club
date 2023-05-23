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
  deleteClub,
} = require("../controllers/clubController");

router.get("/", protect, getClubs);
router.post("/", protect, createClub);
router.delete("/:id", protect, deleteClub);
router.get("/club", protect, getClub);
router.get("/myClubs", protect, getMyClubs);
router.post("/join", protect, joinClub);
router.delete("/leave/:id", protect, leaveClub);

module.exports = router;
