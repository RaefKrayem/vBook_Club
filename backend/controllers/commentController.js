const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const { book_selfLink } = req.body;

  // get comments for a book and sort by date from oldest to newest
  const getCommentsQuery =
    "SELECT comments.*, users.profile FROM comments INNER JOIN users ON comments.user_id = users.id WHERE comments.book_selfLink = ? ORDER BY comments.created_at ASC";
  db.query(getCommentsQuery, [book_selfLink], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(200).json([]);
    } else {
      console.log(results);
      res.status(200).json(results);
    }
  });
});

// @desc    Add comment
// @route   POST /api/comments/add
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const comment = {
    id: uuid(),
    book_selfLink: req.body.book_selfLink,
    user_id: req.user.id,
    username: req.user.username,
    comment_text: req.body.comment_text,
    created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
  };
  const addCommentQuery = "INSERT INTO comments SET ?";
  db.query(addCommentQuery, [comment], (error, results) => {
    if (error) {
      throw error;
    } else {
      comment.profile = req.user.profile;
      res.status(200).json(comment);
    }
  });
});

// @desc    Delete comment
// @route   DELETE /api/comments/delete
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const comment_id = req.params.id;
  const deleteCommentQuery = "DELETE FROM comments WHERE id = ?";
  db.query(deleteCommentQuery, [comment_id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json(comment_id);
    }
  });
});

module.exports = { getComments, addComment, deleteComment };
