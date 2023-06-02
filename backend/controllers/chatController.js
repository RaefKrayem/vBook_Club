const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get all user chats
// @route   GET /api/chats
// @access  Private
const getChats = asyncHandler(async (req, res) => {
  // get the joined chats of the user
  const getQuery = `SELECT * FROM chats WHERE id IN (SELECT chat_id FROM join_chat WHERE user_id = '${req.user.id}')`;
  db.query(getQuery, (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      // for the non club chats, get the other user's name and profile picture and update the results
      results.forEach((chat) => {
        if (!chat.isClubChat) {
          const getOtherUserQuery = `SELECT * FROM users WHERE id IN (SELECT user_id FROM join_chat WHERE chat_id = '${chat.id}' AND user_id != '${req.user.id}')`;
          db.query(getOtherUserQuery, (error, otherUser) => {
            if (error) {
              throw error;
            }
            if (otherUser && otherUser.length > 0) {
              chat.profile =
                otherUser[0].profile != ""
                  ? otherUser[0].profile
                  : "https://www.bootdey.com/img/Content/avatar/avatar1.png";
              chat.name = otherUser[0].username;
            } else {
              chat.profile =
                "https://www.bootdey.com/img/Content/avatar/avatar1.png";
              chat.name = "Deleted User";
            }
            // update the results array with the other user's name and profile picture
            const index = results.findIndex((x) => x.id === chat.id);
            results[index] = chat;

            // if we reach the end of the results array, send the results
            if (index === results.length - 1) {
              res.status(200).json(results);
            }
          });
        }
      });

      // handle the case when the user has only club chats
      if (results.every((chat) => chat.isClubChat)) {
        res.status(200).json(results);
      }
    } else {
      res.status(200).json([]);
    }
  });
});

// @desc    Create a chat
// @route   POST /api/chats/
// @access  Private
const createChat = asyncHandler(async (req, res) => {
  const chat = {
    id: req.body.id,
    name: req.body.name,
    chatAdmin_id: req.user.id,
    isClubChat: req.body.isClubChat,
  };
  const insertQuery = "INSERT INTO chats SET ?";
  db.query(insertQuery, chat, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(201).json(`Chat ${chat.name} created`);
  });
});

module.exports = { getChats, createChat };
