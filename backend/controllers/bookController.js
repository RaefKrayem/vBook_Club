const asyncHandler = require("express-async-handler");
const { db } = require("../config/db");

// @desc    Get books
// @route   GET /api/books
// @access  Private
const getBooks = asyncHandler(async (req, res) => {
  const getBooksQuery =
    "SELECT book_selfLink, book_title, book_authors, book_categories, book_description, book_image FROM saved_books WHERE user_id = ?";
  db.query(getBooksQuery, [req.user.id], (error, results) => {
    if (error) {
      throw error;
    }

    if (results.length === 0) {
      res.status(200).json([]);
    } else {
      res.status(200).json(results);
    }
  });
});

// @desc    Save book
// @route   POST /api/books
// @access  Private
const saveBook = asyncHandler(async (req, res) => {
  console.log("req.body categories: ", req.body.book_categories);
  const book = {
    book_selfLink: req.body.book_selfLink,
    user_id: req.user.id,
    book_title: req.body.book_title,
    // if book_authors is an array, join it into a string excpet for the last element
    book_authors: Array.isArray(req.body.book_authors)
      ? req.body.book_authors.slice(0, -1).join(", ") +
        " and " +
        req.body.book_authors.slice(-1)
      : req.body.book_authors,
    // if book_categories is an array, join it into a string excpet for the last element
    book_categories: Array.isArray(req.body.book_categories)
      ? req.body.book_categories.slice(0, -1).join(" & ") +
        req.body.book_categories.slice(-1)
      : req.body.book_categories,

    book_description: req.body.book_description,
    book_image: req.body.book_image,
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
  const book_selfLink = req.body.book_selfLink;

  // Update the text of the goal in the database
  const unsaveQuery =
    "DELETE FROM saved_books WHERE book_selfLink = ? and user_id = ?";

  db.query(
    unsaveQuery,
    [book_selfLink, req.user.id],
    function (error, results) {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: `Book not found.` });
      }
      res.status(200).json(book_selfLink);
    }
  );
});
module.exports = {
  getBooks,
  saveBook,
  unsaveBook,
};
