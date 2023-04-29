const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
} = require("../controllers/challengeController");

router.get("/", protect, getChallenges);
router.get("/challenge", protect, getChallenge);
router.post("/create", protect, createChallenge);
router.put("/update/:id", protect, updateChallenge);
router.delete("/delete/:id", protect, deleteChallenge);

module.exports = router;
