const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get challenges
// @route   GET /api/challenges
// @access  Private
const getChallenges = asyncHandler(async (req, res) => {
  const getChallengesQuery = "SELECT * FROM challenges WHERE creator_id = ?";
  db.query(getChallengesQuery, req.user.id, (error, results) => {
    if (error) {
      throw error;
    }
    // update the status of each challenge if the end date is before today and the status is not completed
    results.forEach((challenge) => {
      if (
        challenge.end_date < new Date().toISOString().slice(0, 10) &&
        challenge.status !== "completed"
      ) {
        challenge.status = "failed";
        db.query(
          "UPDATE challenges SET status = 'failed' WHERE id = ?",
          challenge.id,
          (error, results) => {
            if (error) {
              throw error;
            }
          }
        );
      }
    });
    // get the challenges again
    db.query(getChallengesQuery, req.user.id, (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results);
    });
  });
});

// @desc    Get challenge
// @route   GET /api/challenges/challenge
// @access  Private
const getChallenge = asyncHandler(async (req, res) => {
  const challenge_id = req.body.challenge_id;
  const getChallengeQuery = "SELECT * FROM challenges WHERE id = ?";
  db.query(getChallengeQuery, [challenge_id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(404).json({ message: `Challenge ${challenge_id} not found.` });
    } else {
      res.status(200).json({ challenge: results[0] });
    }
  });
});

// @desc    Create challenge
// @route   POST /api/challenges/create
// @access  Private
const createChallenge = asyncHandler(async (req, res) => {
  const { name, total_pages, start_date, end_date } = req.body;

  const challenge = {
    id: uuid(),
    name: name,
    total_pages: total_pages,
    completed_pages: 0,
    start_date: start_date,
    end_date: end_date,
    status: "in progress",
    creator_id: req.user.id,
  };

  // if the start date is before today or the end date is before the start date, return error
  if (challenge.start_date < new Date().toISOString().slice(0, 10)) {
    res.status(400).json({ message: "Start date is before today." });
  } else if (challenge.end_date < challenge.start_date) {
    res.status(400).json({ message: "End date is before start date." });
  } else {
    const checkChallengeQuery = "SELECT * FROM challenges WHERE name = ?";
    db.query(checkChallengeQuery, [name], (error, results) => {
      if (error) {
        throw error;
      } else if (results.length !== 0) {
        res.status(400).json({ message: "Challenge name already taken" });
      } else {
        const createChallengeQuery = "INSERT INTO challenges SET ?";
        db.query(createChallengeQuery, challenge, (error, results) => {
          if (error) {
            throw error;
          } else {
            res.status(201).json(challenge);
          }
        });
      }
    });
  }
});

// @desc    Update challenge
// @route   PUT /api/challenges/update
// @access  Private
const updateChallenge = asyncHandler(async (req, res) => {
  const { name, total_pages, completed_pages, start_date, end_date } =
    req.body.challenge;
  const challenge_id = req.params.id;

  const getChallengeQuery =
    "SELECT * FROM challenges WHERE id = ? and creator_id = ? && status = 'in progress'";
  db.query(getChallengeQuery, [challenge_id, req.user.id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(404).json({ message: `Challenge ${challenge_id} not found.` });
    } else {
      const currentChallenge = results[0];
      const challenge = {
        name: name || currentChallenge.name,
        total_pages: parseInt(total_pages) || currentChallenge.total_pages,
        completed_pages:
          parseInt(completed_pages) || currentChallenge.completed_pages,
        start_date: start_date || currentChallenge.start_date,
        end_date: end_date || currentChallenge.end_date,
      };

      console.log("challenge: ", challenge);

      // if the start date is before today or the end date is before the start date, return error
      // if (challenge.start_date < new Date().toISOString().slice(0, 10)) {
      //   res.status(400).json({ message: "Start date is before today." });
      // }
      // if the end date is before the start date, return error
      if (challenge.end_date < challenge.start_date) {
        res.status(400).json({ message: "End date is before start date." });
      }
      // if the completed pages is greater than the total pages, set completed pages to total pages
      if (challenge.completed_pages > challenge.total_pages) {
        challenge.completed_pages = challenge.total_pages;
      }

      // if current new completed pages is less than the current completed pages, return error
      if (challenge.completed_pages < currentChallenge.completed_pages) {
        res.status(400).json({
          message:
            "Completed pages cannot be less than current completed pages.",
        });
      }

      if (challenge.completed_pages == challenge.total_pages) {
        challenge.status = "completed";
      }

      // if end date is before today, and status is not completed, set status to failed
      if (
        challenge.end_date < new Date().toISOString().slice(0, 10) &&
        challenge.status !== "completed"
      ) {
        challenge.status = "failed";
      }

      // update Query
      db.query(
        "UPDATE challenges SET ? WHERE id = ?",
        [challenge, challenge_id],
        (error, results) => {
          if (error) {
            throw error;
          } else {
            if (results.affectedRows !== 0) {
              res.status(200).json({ message: "Challenge updated" });
            } else {
              res
                .status(400)
                .json({ message: "Challenge could not be updated" });
            }
          }
        }
      );
    }
  });
});

// @desc    Delete challenge
// @route   DELETE /api/challenges/delete
// @access  Private
const deleteChallenge = asyncHandler(async (req, res) => {
  console.log("delete challenge function in backend");
  const challenge_id = req.params.id;
  const getChallengeQuery =
    "SELECT * FROM challenges WHERE id = ? AND creator_id = ?";
  db.query(getChallengeQuery, [challenge_id, req.user.id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(404).json({ message: `Challenge ${challenge_id} not found.` });
    } else {
      const deleteChallengeQuery = "DELETE FROM challenges WHERE id = ?";
      db.query(deleteChallengeQuery, [challenge_id], (error, results) => {
        if (error) {
          throw error;
        } else {
          res.status(200).json({ id: challenge_id });
        }
      });
    }
  });
});

module.exports = {
  getChallenges,
  getChallenge,
  createChallenge,
  updateChallenge,
  deleteChallenge,
};
