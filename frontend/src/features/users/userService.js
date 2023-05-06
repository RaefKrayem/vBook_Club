import axios from "axios";

const API_URL = "http://localhost:5005/api/users/";

// get all users
const getUsers = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

const addFriend = async (friend_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "add",
    { friend_id: friend_id },
    config
  );
  return response.data;
};

const userService = {
  getUsers,
  addFriend,
};

export default userService;
