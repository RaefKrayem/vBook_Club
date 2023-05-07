import axios from "axios";

const API_URL = "http://localhost:5005/api/comments/";

// get all comments
const getComments = async (book_selfLink, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "all", { book_selfLink }, config);
  return response.data;
};

// create comment
const addComment = async (comment, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL + "add", comment, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// delete comment
const deleteComment = async (comment_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      API_URL + "delete/" + comment_id,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const commentService = {
  getComments,
  addComment,
  deleteComment,
};

export default commentService;
