import axios from "axios";

const API_URL = "http://localhost:5005/api/friends/";

// Get all friends
const getFriends = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete friend
const removeFriend = async (friend_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(
      API_URL + "remove/" + friend_id,
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const friendService = {
  getFriends,
  removeFriend,
};

export default friendService;
