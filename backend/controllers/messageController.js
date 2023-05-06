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

// access friends messages if exist or create new chat
// @desc    Access chat with friend
// @route   GET /api/messages/friend
// @access  Private
const getFriendMessages = asyncHandler(async (req, res) => {
  const friend_id = req.params.friend_id;
  let chatName = "";

  // get friend's username
  const getFriendUsernameQuery = "SELECT username FROM users WHERE id = ?";
  db.query(getFriendUsernameQuery, [friend_id], (error, results) => {
    if (error) {
      throw error;
    }
    const friendUsername = results[0].username;
    chatName = `${req.user.username} ${friendUsername}`;
    console.log("chatName: ", chatName);
  });
  // check if there is already a chat between the two users
  if (friend_id) {
    const checkQuery =
      "SELECT * FROM chats WHERE id IN (SELECT chat_id FROM join_chat WHERE user_id = ? AND isClubChat = 0) AND id IN (SELECT chat_id FROM join_chat WHERE user_id = ? AND isClubChat = 0)";
    db.query(checkQuery, [req.user.id, friend_id], (error, results) => {
      if (error) {
        throw error;
      }
      if (results.length > 0) {
        const chat = results[0];
        // get messages from the chat
        const getMessagesQuery =
          "SELECT * FROM messages WHERE chat_id = ? ORDER BY sent_at ASC";
        db.query(getMessagesQuery, [chat.id], (error, results) => {
          if (error) {
            throw error;
          }
          if (results.length === 0) {
            res.status(200).json([]);
          } else {
            res.status(200).json(results);
          }
        });
      } else {
        const chat = {
          id: uuid(),
          // name of user + name of friend --> split in frontend
          name: chatName,
          chatAdmin_id: req.user.id,
          isClubChat: friend_id ? 0 : 1,
        };
        // create chat in chats table then add chat_id and user_id to join_chat table,
        // and if it is not a club chat, add friend_id and chat_id to join_chat table
        const createChatQuery = "INSERT INTO chats SET ?";
        db.query(createChatQuery, [chat], (error, results) => {
          if (error) {
            throw error;
          }
          const joinChatQuery = "INSERT INTO join_chat SET ?";
          db.query(
            joinChatQuery,
            [{ chat_id: chat.id, user_id: req.user.id }],
            (error, results) => {
              if (error) {
                throw error;
              }
              // if it is not a club chat, add friend_id and chat_id to join_chat table
              if (!chat.isClubChat) {
                db.query(
                  joinChatQuery,
                  [{ chat_id: chat.id, user_id: friend_id }],
                  (error, results) => {
                    if (error) {
                      throw error;
                    }
                    // get messages from the chat
                    const getMessagesQuery =
                      "SELECT * FROM messages WHERE chat_id = ? ORDER BY sent_at ASC";
                    db.query(getMessagesQuery, [chat.id], (error, results) => {
                      if (error) {
                        throw error;
                      } else if (results.length === 0) {
                        res.status(200).json([]);
                      } else {
                        res.status(200).json(results);
                      }
                    });
                  }
                );
              } else {
                res.status(200).json(chat);
              }
            }
          );
        });
      }
    });
  }
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

module.exports = { getMessages, sendMessage, deleteMessage, getFriendMessages };
