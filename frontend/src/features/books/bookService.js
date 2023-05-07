import axios from "axios";

const API_URL = "http://localhost:5005/api/books/";

// Get all saved books
const getBooks = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// save book
const saveBook = async (book, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, book, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// unsave book
const unsaveBook = async (book_selfLink, token) => {
  try {
    const response = await axios.delete(API_URL, {
      data: { book_selfLink },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const bookService = {
  getBooks,
  saveBook,
  unsaveBook,
};

export default bookService;
