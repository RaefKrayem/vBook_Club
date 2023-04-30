import axios from "axios";

const API_URL = "http://localhost:5005/api/clubs/";

// Get user Clubs
const getMyClubs = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "myClubs", config);
  return response.data;
};

// Leave Club
const leaveClub = async (club_id, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.delete(API_URL + "leave/" + club_id, config);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const myClubService = {
  getMyClubs,
  leaveClub,
};

export default myClubService;
