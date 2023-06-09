import axios from "axios";

const API_URL = "http://localhost:5005/api/messages/";

// get all messages
const getMessages = async (chat_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + `message/${chat_id}`, config);
  return response.data;
};

const getFriendMessages = async ({ friend_id, chatName }, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(API_URL + `friend/${friend_id}`, config);
    console.log("friends messages response", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

// create message
const sendMessage = async ({ content, chat_id }, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      API_URL + "send",
      { content, chat_id },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const messageService = {
  getMessages,
  sendMessage,
  getFriendMessages,
};

export default messageService;
