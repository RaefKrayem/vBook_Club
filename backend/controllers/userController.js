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
  const { username, email, password } = req.body;

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
      };

      db.query("INSERT INTO users SET ?", user, (error, results) => {
        if (error) throw error;
        res.status(201).json({
          _id: user.id,
          username: user.username,
          email: user.email,
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
  // get all users except the current user
  const getQuery = "SELECT * FROM users WHERE id != ?";
  db.query(getQuery, [req.user.id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
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

  // check if friend exists
  // const checkFriendQuery =
  //   "SELECT * FROM friends WHERE user_id = ? AND friend_id = ?";

  // db.query(checkFriendQuery, [user_id, friend_id], (error, results) => {
  //   if (error) throw error;

  //   if (results.length === 0) {
  // add friend to friends list of both users
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
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  addFriend,
};
