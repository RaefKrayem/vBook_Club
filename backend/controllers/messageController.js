const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const chat_id = req.params.id;

  // get messages from a chat
  const getMessagesQuery =
    "SELECT * FROM messages WHERE chat_id = ? ORDER BY sent_at ASC";
  db.query(getMessagesQuery, [chat_id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// @desc    Send message
// @route   POST /api/messages/send
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const message = {
    id: uuid(),
    sender_username: req.user.username,
    sender_id: req.user.id,
    chat_id: req.body.chat_id,
    content: req.body.content,
    sent_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  const sendMessageQuery = "INSERT INTO messages SET ?";
  db.query(sendMessageQuery, [message], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(message);
    }
  });
});

// @desc    Delete message
// @route   DELETE /api/messages/delete
// @access  Private
const deleteMessage = asyncHandler(async (req, res) => {
  const { message_id } = req.body;
  const deleteMessageQuery = "DELETE FROM messages WHERE id = ?";
  db.query(deleteMessageQuery, [message_id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json({ message: "Message deleted" });
    }
  });
});

module.exports = { getMessages, sendMessage, deleteMessage };
