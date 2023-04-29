const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get all messages
// @route   GET /api/messages
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const { sender_id, receiver_id } = req.body;

  // get messages between two users
  const getMessagesQuery =
    "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?)";
  db.query(
    getMessagesQuery,
    [sender_id, receiver_id, receiver_id, sender_id],
    (error, results) => {
      if (error) {
        throw error;
      } else if (results.length === 0) {
        res.status(404).json({ message: `No messages found.` });
      } else {
        res.status(200).json({ messages: results });
      }
    }
  );
});

// @desc    Send message
// @route   POST /api/messages/send
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  // id sender_id receiver_id message sent_at
  const { receiver_id, message } = req.body;
  const message_id = uuid();
  const sent_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const sendMessageQuery =
    "INSERT INTO messages (id, sender_id, receiver_id, message, sent_at) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sendMessageQuery,
    [message_id, req.user.id, receiver_id, message, sent_at],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json({ message: "Message sent" });
      }
    }
  );
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
