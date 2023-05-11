import axios from "axios";

const API_URL = "http://localhost:5005/api/chats/";

// get all chats
const getChats = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// create chat
const createChat = async (chat, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(API_URL, chat, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// access chat
const accessFriendChat = async (friend_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // get the chat of 2 friends then add it to the chats array
    // access it in the user item and request the messages of the chat
    const response = await axios.post(API_URL, { friend_id }, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const chatService = {
  getChats,
  createChat,
  accessFriendChat,
};

export default chatService;
