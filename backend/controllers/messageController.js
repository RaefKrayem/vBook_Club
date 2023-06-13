const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");
const { io } = require("../server");

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
    }
    if (results.length === 0) {
      results[0] = { chat_id: chat_id };
      res.status(200).json(results);
    } else {
      // loop through messages and get the sender's username and profile
      // from the users table
      // then add the profile and sender_username to the message object
      results.forEach((message) => {
        const getSenderQuery = "SELECT * FROM users WHERE id = ?";
        db.query(getSenderQuery, [message.sender_id], (error, sender) => {
          if (error) {
            throw error;
          }
          message.sender_username = sender[0].username;
          message.profile = sender[0].profile;
          // if this is the last message, send the results
          const index = results.findIndex((x) => x.id === message.id);
          results[index] = message;
          if (index === results.length - 1) {
            res.status(200).json(results);
          }
        });
      });
    }
  });
});

// @desc    Access chat with friend
// @route   GET /api/messages/friend
// @access  Private
const getFriendMessages = asyncHandler(async (req, res) => {
  const friend_id = req.params.friend_id;
  let chatName = "";

  // Get friend's username and profile
  const getFriendInfoQuery = "SELECT username, profile FROM users WHERE id = ?";
  db.query(getFriendInfoQuery, [friend_id], (error, results) => {
    console.log("get friends messages: ", results);
    if (error) {
      throw error;
    }

    if (results.length > 0) {
      const friendUsername = results[0].username;
      const friendProfile = results[0].profile;
      chatName = `${req.user.username} ${friendUsername}`;

      // Check if there is already a chat between the two users
      const checkQuery = `
        SELECT c.id, c.name, c.chatAdmin_id, j1.user_id AS user1_id, j2.user_id AS user2_id
        FROM chats AS c
        INNER JOIN join_chat AS j1 ON c.id = j1.chat_id AND j1.user_id = ?
        INNER JOIN join_chat AS j2 ON c.id = j2.chat_id AND j2.user_id = ?
        WHERE c.isClubChat = 0
      `;
      // returned values are c.id, c.name, c.chatAdmin_id
      db.query(checkQuery, [req.user.id, friend_id], (error, results) => {
        if (error) {
          throw error;
        }

        if (results.length > 0) {
          const chat = results[0];
          const chatId = chat.id;

          // Get messages from the chat
          const getMessagesQuery = `
            SELECT m.*, u.username AS sender_username, u.profile
            FROM messages AS m
            INNER JOIN users AS u ON m.sender_id = u.id
            WHERE m.chat_id = ?
            ORDER BY m.sent_at ASC
          `;
          db.query(getMessagesQuery, [chatId], (error, results) => {
            if (error) {
              throw error;
            }
            if (results.length > 0) {
              const messages = results.map((message) => ({
                id: message.id,
                sender_username: message.sender_username,
                sender_id: message.sender_id,
                chat_id: message.chat_id,
                content: message.content,
                sent_at: message.sent_at,
                profile: message.profile,
              }));

              res.status(200).json(messages);
            } else {
              // existing chat, no messages

              results[0] = {
                chat_id: chatId,
              };
              res.status(200).json(results);
            }
          });
        }
        // NO chat -> create a chat and return its id
        else {
          const chat = {
            id: uuid(),
            name: chatName,
            chatAdmin_id: req.user.id,
            isClubChat: 0,
          };

          const joinChatQuery =
            "INSERT INTO join_chat (chat_id, user_id) VALUES (?, ?)";

          // Create chat in chats table
          const createChatQuery = "INSERT INTO chats SET ?";
          db.query(createChatQuery, [chat], (error, results) => {
            if (error) {
              throw error;
            }

            // Add chat_id and user_id to join_chat table for the current user
            db.query(
              joinChatQuery,
              [chat.id, req.user.id],
              (error, results) => {
                if (error) {
                  throw error;
                }

                // Add chat_id and user_id to join_chat table for the friend
                db.query(
                  joinChatQuery,
                  [chat.id, friend_id],
                  (error, results) => {
                    if (error) {
                      throw error;
                    }
                    res.status(200).json([
                      {
                        chat_id: chat.id,
                      },
                    ]);
                  }
                );
              }
            );
          });
        }
      });
    } else {
      res.status(404).json({ message: "Friend ID not found" });
    }
  });
});

// @desc    Send message
// @route   POST /api/messages
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
