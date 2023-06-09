const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get clubs
// @route   GET /api/clubs
// @access  Private
const getClubs = asyncHandler(async (req, res) => {
  console.log(uuid());
  const getClubsQuery = "SELECT * FROM clubs";
  db.query(getClubsQuery, [req.user.id], (error, results) => {
    if (error) {
      throw error;
    }

    const clubsIds = results.map((club) => club.id);
    const getClubsInfoQuery = "SELECT * FROM clubs WHERE id IN (?)";
    db.query(getClubsInfoQuery, [clubsIds], (error, results) => {
      if (error) throw error;
      const clubs = results;
      const getJoinedClubsQuery =
        "SELECT club_id FROM join_club WHERE user_id = ?";
      db.query(getJoinedClubsQuery, [req.user.id], (error, results) => {
        if (error) throw error;
        const joinedClubs = results.map((club) => club.club_id);
        clubs.forEach((club) => {
          if (joinedClubs.includes(club.id)) {
            club.joined = true;
          } else {
            club.joined = false;
          }
        });
        res.status(200).json(clubs);
      });
    });
  });
});

// @desc    Get clubs: user specific
// @route   GET /api/clubs/myClubs
// @access  Private
const getMyClubs = asyncHandler(async (req, res) => {
  const getClubsQuery = "SELECT club_id FROM join_club WHERE user_id = ?";
  db.query(getClubsQuery, [req.user.id], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(200).json(results);
    } else {
      // request all clubs info from clubs table
      const clubs = results.map((club) => club.club_id);
      const getClubsInfoQuery = "SELECT * FROM clubs WHERE id IN (?)";
      db.query(getClubsInfoQuery, [clubs], (error, results) => {
        if (error) throw error;
        res.status(200).json(results);
      });
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
  const club_id = req.body.id;
  const joinClubQuery =
    "INSERT INTO join_club (club_id, user_id) VALUES (?, ?)";

  db.query(joinClubQuery, [club_id, req.user.id], (error, results) => {
    if (error) {
      throw error;
    } else {
      // add the user_id and club_id to join_chat table
      const joinChatQuery =
        "INSERT INTO join_chat (user_id, chat_id) VALUES (?, ?)";
      db.query(joinChatQuery, [req.user.id, club_id], (error, results) => {
        if (error) {
          throw error;
        } else {
          // select the club info from clubs table where id = club_id
          const getClubQuery = "SELECT * FROM clubs WHERE id = ?";
          db.query(getClubQuery, [club_id], (error, results) => {
            if (error) throw error;
            res.status(200).json(results);
          });
        }
      });
    }
  });
});

// @desc    Leave club
// @route   DELETE /api/clubs/leave
// @access  Private
const leaveClub = asyncHandler(async (req, res) => {
  const club_id = req.params.id;

  const leaveQuery = "DELETE FROM join_club WHERE club_id = ? and user_id = ?";

  db.query(leaveQuery, [club_id, req.user.id], function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `Club ${club_id} not found.` });
    } else {
      // delete the user_id and club_id from join_chat table
      const leaveChatQuery =
        "DELETE FROM join_chat WHERE user_id = ? and chat_id = ?";
      db.query(leaveChatQuery, [req.user.id, club_id], (error, results) => {
        if (error) {
          throw error;
        } else {
          // delete the user from join_chat table where user_id = req.user.id and chat_id = club_id
          const leaveChatQuery =
            "DELETE FROM join_chat WHERE user_id = ? and chat_id = ?";
          db.query(leaveChatQuery, [req.user.id, club_id], (error, results) => {
            if (error) {
              throw error;
            }
          });

          // select the clubs ids from join_club table where user_id = req.user.id
          const getClubsQuery =
            "SELECT club_id FROM join_club WHERE user_id = ?";
          db.query(getClubsQuery, [req.user.id], (error, results) => {
            if (error) {
              throw error;
            } else {
              console.log(club_id);
              res.status(200).json({ id: club_id });
            }
          });
        }
      });
    }
  });
});

// @desc    Create club
// @route   POST /api/clubs
// @access  Private
const createClub = asyncHandler(async (req, res) => {
  const { name, description, profile } = req.body;

  const checkQuery = "SELECT * FROM clubs WHERE name = ?";
  db.query(checkQuery, [name], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      const createClubQuery = "INSERT INTO clubs SET ?";
      const club = {
        id: uuid(),
        name: name,
        description: description,
        profile: profile,
      };

      db.query(createClubQuery, club, (error, results) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json(club);
        }
      });
    } else {
      res.status(400).json({ message: "Club already exists" });
    }
  });
});

// @desc    Delete club
// @route   POST /api/clubs
// @access  Private
const deleteClub = asyncHandler(async (req, res) => {
  const club_id = req.params.id;
  const deleteClubQuery = `DELETE FROM clubs WHERE id = ?`;

  db.query(deleteClubQuery, club_id, (error, results) => {
    if (error) {
      throw error;
    } else if (results.affectedRows > 0) {
      res.status(200).json({ id: club_id });
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
  deleteClub,
};
