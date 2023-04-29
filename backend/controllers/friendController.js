const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");

// @desc    View Friends List
// @route   GET /api/friends
// @access  Private
const getFriends = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  // get friends list
  const getFriendsQuery = "SELECT friend_id FROM friends WHERE user_id = ?";

  db.query(getFriendsQuery, [user_id], (error, results) => {
    if (error) throw error;

    // request all friends info from users table
    const friends = results.map((friend) => friend.friend_id);
    const getFriendsInfoQuery = "SELECT * FROM users WHERE id IN (?)";
    db.query(getFriendsInfoQuery, [friends], (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  });
});

// @desc    View Friend
// @route   GET /api/friends/friend
// @access  Private
const getFriend = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const friend_id = req.body.friend_id;

  // check if friend exists
  const checkFriendQuery =
    "SELECT * FROM friends WHERE user_id = ? AND friend_id = ?";
  db.query(checkFriendQuery, [user_id, friend_id], (error, results) => {
    if (error) throw error;
    if (results.length === 0) {
      res.status(404).json({ message: "Friend not found" });
    } else {
      // get friend info from users table
      const getFriendInfoQuery = "SELECT * FROM users WHERE id = ?";
      db.query(getFriendInfoQuery, [friend_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
      });
    }
  });
});

// @desc    Remove Friend
// @route   DELETE /api/friends/remove
// @access  Private
const removeFriend = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  const friend_id = req.body.friend_id;

  // check if friend exists
  const checkFriendQuery =
    "SELECT * FROM friends WHERE user_id = ? AND friend_id = ?";

  db.query(checkFriendQuery, [user_id, friend_id], (error, results) => {
    if (error) throw error;

    if (results.length === 0) {
      res.status(404).json({ message: "Friend not found" });
    } else {
      // remove friendship from friends table
      const removeFriendQuery =
        "DELETE FROM friends WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?)";
      db.query(
        removeFriendQuery,
        [user_id, friend_id, friend_id, user_id],
        (error, results) => {
          if (error) throw error;

          if (results.affectedRows === 0) {
            res.status(404).json({ message: "Friend not found" });
          } else {
            res.status(200).json({ message: `Friend ${friend_id} removed` });
          }
        }
      );
    }
  });
});

module.exports = { getFriends, getFriend, removeFriend };
