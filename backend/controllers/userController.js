const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const mysql = require("mysql");
const { uuid } = require("uuidv4");
const { db } = require("../config/db");

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, profile } = req.body;

  console.log("req body: ", req.body);

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [email], async (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (results.length === 0) {
      // hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = {
        id: uuid(),
        username: username,
        email: email,
        password: hashedPassword,
        profile: profile,
      };

      db.query("INSERT INTO users SET ?", user, (error, results) => {
        if (error) throw error;
        res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email,
          profile: user.profile,
          token: generateToken(user.id),
        });
      });
    } else {
      return res.status(400).json({ message: "Email already exists" });
    }
  });
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // check if user exists
  const checkUser = "SELECT * FROM users WHERE email = ?";
  db.query(checkUser, [email], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;

        if (result) {
          res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            profile: user.profile,
            token: generateToken(user.id),
          });
        } else {
          res.status(400).json({ message: "Invalid password" });
        }
      });
    } else {
      res.status(400).json({ message: "Invalid email" });
    }
  });
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// @desc    Get All other users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const getQuery = "SELECT * FROM users WHERE id != ?";
  db.query(getQuery, [req.user.id], (error, results) => {
    if (error) throw error;

    const users = results;

    const getFriendsQuery =
      "SELECT user_id, COUNT(*) AS friends FROM friends GROUP BY user_id";
    db.query(getFriendsQuery, (error, results) => {
      if (error) throw error;

      const friends = results;

      const getChallengesQuery =
        "SELECT creator_id, COUNT(*) AS challenges FROM challenges GROUP BY creator_id";
      db.query(getChallengesQuery, (error, results) => {
        if (error) throw error;

        const challenges = results;

        users.forEach((user) => {
          user.friends = 0;
          user.challenges = 0;
          friends.forEach((friend) => {
            if (user.id === friend.user_id) {
              user.friends = friend.friends;
            }
          });
          challenges.forEach((challenge) => {
            if (user.id === challenge.creator_id) {
              user.challenges = challenge.challenges;
            }
          });
        });

        res.status(200).json(users);
      });
    });
  });
});

// @desc    Add user to friends list
// @route   POST /api/users/add
// @access  Private
const addFriend = asyncHandler(async (req, res) => {
  // add the user_id and friend_id to the friends table
  // return the friend information to be added to the friends array in the redux state

  const friend_id = req.body.friend_id;
  const user_id = req.user.id;

  const addFriendQuery =
    "INSERT INTO friends (user_id, friend_id) VALUES (?, ?), (?, ?)";

  db.query(
    addFriendQuery,
    [user_id, friend_id, friend_id, user_id],
    (error, results) => {
      if (error) throw error;
      const friendInfoQuery = "SELECT * FROM users WHERE id = ?";
      db.query(friendInfoQuery, [friend_id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
      });
    }
  );
  // } else {
  //   res.status(400).json({ message: "Friend already exists" });
  // }
});
// });

// Generate JWT
const generateToken = (id) => {
  // jwt.sign( {data}, secret, {expiresIn: 1days})
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  addFriend,
};
