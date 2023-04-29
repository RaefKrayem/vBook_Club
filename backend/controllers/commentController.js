const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");
const { uuid } = require("uuidv4");

// @desc    Get all comments
// @route   GET /api/comments
// @access  Private
const getComments = asyncHandler(async (req, res) => {
  const { book_id } = req.body;

  // get comments for a book
  const getCommentsQuery = "SELECT * FROM comments WHERE book_id = ?";
  db.query(getCommentsQuery, [book_id], (error, results) => {
    if (error) {
      throw error;
    } else if (results.length === 0) {
      res.status(404).json({ message: `No comments found.` });
    } else {
      res.status(200).json({ comments: results });
    }
  });
});

// @desc    Add comment
// @route   POST /api/comments/add
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const { book_id, comment_text } = req.body;
  const comment_id = uuid();
  const created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const addCommentQuery =
    "INSERT INTO comments (id, book_id, user_id, comment_text, created_at) VALUES (?, ?, ?, ?, ?)";
  db.query(
    addCommentQuery,
    [comment_id, book_id, req.user.id, comment_text, created_at],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.status(200).json({ message: "Comment added" });
      }
    }
  );
});

// @desc    Delete comment
// @route   DELETE /api/comments/delete
// @access  Private
const deleteComment = asyncHandler(async (req, res) => {
  const { comment_id } = req.body;
  const deleteCommentQuery = "DELETE FROM comments WHERE id = ?";
  db.query(deleteCommentQuery, [comment_id], (error, results) => {
    if (error) {
      throw error;
    } else {
      res.status(200).json({ message: "Comment deleted" });
    }
  });
});

module.exports = { getComments, addComment, deleteComment };
