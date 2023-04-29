const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  addFriend,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.get("/", protect, getUsers);
router.post("/login", loginUser);
router.post("/add", protect, addFriend);
router.get("/me", protect, getMe);

module.exports = router;
