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

// @desc    Create chat
// @route   POST /api/chats
// @access  Private
// const accessChat = asyncHandler(async (req, res) => {
//   const friend_id = req.body.friend_id;

//   // check if there is already a chat between the two users
//   if (friend_id) {
//     const checkQuery =
//       "SELECT * FROM chats WHERE id IN (SELECT chat_id FROM join_chat WHERE user_id = ? AND isClubChat = 0) AND id IN (SELECT chat_id FROM join_chat WHERE user_id = ? AND isClubChat = 0)";
//     db.query(checkQuery, [req.user.id, friend_id], (error, results) => {
//       if (error) {
//         throw error;
//       }
//       if (results.length > 0) {
//         res.status(200).json(results[0]);
//       } else {
//         const chat = {
//           id: uuid(),
//           // name of user + name of friend --> split in frontend
//           name: req.body.name,
//           chatAdmin_id: req.user.id,
//           isClubChat: friend_id ? 0 : 1,
//         };
//         // create chat in chats table then add chat_id and user_id to join_chat table,
//         // and if it is not a club chat, add friend_id and chat_id to join_chat table
//         const createChatQuery = "INSERT INTO chats SET ?";
//         db.query(createChatQuery, [chat], (error, results) => {
//           if (error) {
//             throw error;
//           }
//           const joinChatQuery = "INSERT INTO join_chat SET ?";
//           db.query(
//             joinChatQuery,
//             [{ chat_id: chat.id, user_id: req.user.id }],
//             (error, results) => {
//               if (error) {
//                 throw error;
//               }
//               // if it is not a club chat, add friend_id and chat_id to join_chat table
//               if (!chat.isClubChat) {
//                 db.query(
//                   joinChatQuery,
//                   [{ chat_id: chat.id, user_id: friend_id }],
//                   (error, results) => {
//                     if (error) {
//                       throw error;
//                     }
//                     res.status(200).json(chat);
//                   }
//                 );
//               } else {
//                 res.status(200).json(chat);
//               }
//             }
//           );
//         });
//       }
//     });
//   }
// });

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
