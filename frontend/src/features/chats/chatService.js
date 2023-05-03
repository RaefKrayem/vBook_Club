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

const chatService = {
  getChats,
  createChat,
};

export default chatService;
