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
    "SELECT * FROM comments WHERE book_selfLink = ? ORDER BY created_at ASC";
  db.query(getCommentsQuery, [book_selfLink], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(200).json([]);
    } else {
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
