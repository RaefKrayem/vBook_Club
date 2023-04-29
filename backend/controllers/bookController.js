const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");

// @desc    Get books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
  const getBooksQuery =
    "SELECT book_id, book_title, book_author, book_description, book_image FROM saved_books WHERE user_id = ?";
  db.query(getBooksQuery, [req.user.id], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "You don't have any saved books" });
    } else {
      res.status(200).json({ saved_books: results });
    }
  });
});

// @desc    Save book
// @route   POST /api/books
// @access  Private
const saveBook = asyncHandler(async (req, res) => {
  const book = {
    book_id: req.body.book_id,
    user_id: req.user.id,
    book_title: req.body.book_title,
    book_author: req.body.book_author,
    book_description: req.body.book_description,
    book_image: req.body.imageLinks || null,
  };

  const saveQuery = "Insert INTO saved_books SET ?";

  db.query(saveQuery, book, (error, results) => {
    if (error) {
      throw error;
    }
    res.status(200).json(book);
  });
});

// @desc    Unsave book
// @route   DELETE /api/books
// @access  Private
const unsaveBook = asyncHandler(async (req, res) => {
  const book_id = req.body.book_id;

  // Update the text of the goal in the database
  const unsaveQuery =
    "DELETE FROM saved_books WHERE book_id = ? and user_id = ?";

  db.query(unsaveQuery, [book_id, req.user.id], function (error, results) {
    if (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: `book ${book_id} not found.` });
    }
    res.status(200).json({ message: `Goal ${book_id} unsaved successfully.` });
  });
});

module.exports = {
  getBooks,
  saveBook,
  unsaveBook,
};
