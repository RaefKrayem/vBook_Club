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
    "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY sent_at ASC";
  db.query(
    getMessagesQuery,
    [sender_id, receiver_id, receiver_id, sender_id],
    (error, results) => {
      if (error) {
        throw error;
      } else if (results.length === 0) {
        res.status(404).json({ message: `No messages found.` });
      } else {
        // select the sender_id and receiver_id info from users table
        const getSenderReceiverQuery =
          "SELECT id, username, email FROM users WHERE id = ? OR id = ?";
        db.query(
          getSenderReceiverQuery,
          [sender_id, receiver_id],
          (error, results2) => {
            if (error) {
              throw error;
            } else {
              // add sender and receiver info to each message
              results.forEach((message) => {
                results2.forEach((user) => {
                  if (message.sender_id === user.id) {
                    message.sender_username = user.username;
                    message.sender_email = user.email;
                  }
                });
              });
            }
            res.status(200).json(results);
          }
        );
      }
    }
  );
});

// @desc    Send message
// @route   POST /api/messages/send
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  // id sender_id receiver_id message sent_at

  const message = {
    id: uuid(),
    sender_id: req.user.id,
    receiver_id: req.body.receiver_id,
    message: req.body.message,
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
