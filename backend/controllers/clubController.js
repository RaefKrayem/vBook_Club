const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get clubs
// @route   GET /api/clubs
// @access  Private
const getClubs = asyncHandler(async (req, res) => {
  const getClubsQuery = "SELECT * FROM clubs";
  db.query(getClubsQuery, (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "No Clubs in Database" });
    } else {
      res.status(200).json({ clubs: results });
    }
  });
});

// @desc    Get clubs: user specific
// @route   GET /api/clubs/myClubs
// @access  Private
const getMyClubs = asyncHandler(async (req, res) => {
  const getClubsQuery = "SELECT * FROM join_club WHERE user_id = ?";
  db.query(getClubsQuery, [req.user.id], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "Join clubs and start chatting" });
    } else {
      res.status(200).json({ clubs: results });
    }
  });
});

// @desc    Get club
// @route   GET /api/clubs/club
// @access  Private
const getClub = asyncHandler(async (req, res) => {
  const club_id = req.body.club_id;
  const getClubQuery = "SELECT * FROM clubs WHERE id = ?";
  db.query(getClubQuery, [club_id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(404).json({ message: `Club ${club_id} not found.` });
    } else {
      res.status(200).json({ club: results[0] });
    }
  });
});

// @desc    Join club
// @route   POST /api/clubs/join
// @access  Private
const joinClub = asyncHandler(async (req, res) => {
  const club_id = req.body.club_id;
  const joinClubQuery =
    "INSERT INTO join_club (club_id, user_id) VALUES (?, ?)";

  db.query(joinClubQuery, [club_id, req.user.id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json({
        message: `User ${req.user.id} joined ${club_id} successfully`,
      });
    }
  });
});

// @desc    Leave club
// @route   DELETE /api/clubs/leave
// @access  Private
const leaveClub = asyncHandler(async (req, res) => {
  const club_id = req.body.club_id;

  // Update the text of the goal in the database
  const unsaveQuery = "DELETE FROM join_club WHERE club_id = ? and user_id = ?";

  db.query(unsaveQuery, [club_id, req.user.id], function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `Club ${club_id} not found.` });
    }
    res.status(200).json({ message: `Leaved club ${club_id} successfully.` });
  });
});

// @desc    Create club
// @route   POST /api/clubs
// @access  Private
const createClub = asyncHandler(async (req, res) => {
  const { club_name, club_description } = req.body;

  const checkQuery = "SELECT * FROM clubs WHERE name = ?";
  db.query(checkQuery, [club_name], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      const createClubQuery = "INSERT INTO clubs SET ?";
      const club = {
        id: uuid(),
        name: club_name,
        description: club_description,
      };

      db.query(createClubQuery, club, (error, results) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json({
            message: `Club ${club.club_id} created successfully`,
          });
        }
      });
    } else {
      res.status(400).json({ message: "Club already exists" });
    }
  });
});

module.exports = {
  getClubs,
  getClub,
  getMyClubs,
  joinClub,
  leaveClub,
  createClub,
};
