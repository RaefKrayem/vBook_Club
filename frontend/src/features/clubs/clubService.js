import axios from "axios";

const API_URL = "http://localhost:5005/api/clubs/";

// Get all Clubs
const getClubs = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// join Club
const joinClub = async (club_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(
      API_URL + "join",
      { id: club_id },
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const clubService = {
  getClubs,
  joinClub,
};

export default clubService;
