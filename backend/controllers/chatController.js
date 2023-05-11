const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get all user chats
// @route   GET /api/chats
// @access  Private
const getChats = asyncHandler(async (req, res) => {
  // select all chats from join_chat table where user_id = req.user.id and
  // then get all chats from chats table where id = chat_id
  const getQuery =
    "SELECT * FROM chats WHERE id IN (SELECT chat_id FROM join_chat WHERE user_id = ?)";
  db.query(getQuery, [req.user.id], (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(results);
  });
});

// @desc    Get club chats
// @route   GET /api/chats/club
// @access  Private
const getClubChats = asyncHandler(async (req, res) => {
  const getQuery = "SELECT * FROM chats WHERE isClubChat = 1";
  if (error) {
    throw error;
  }
  res.status(200).json(results);
});

module.exports = { getChats, getClubChats };
