import axios from "axios";

const API_URL = "http://localhost:5005/api/challenges/";

// Create new challenge
const createChallenge = async (challengeData, token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL + "create", challengeData, config);
  return response.data;
};

// Get all challenges
const getChallenges = async (token) => {
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete challenge
const deleteChallenge = async (challenge_id, token) => {
  console.log("challenge_id", challenge_id);
  console.log("token", token);
  // send the token in the request header
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(
    API_URL + "delete?challenge_id=" + challenge_id,
    config
  );
  return response.data;
};

const challengeService = {
  createChallenge,
  getChallenges,
  deleteChallenge,
};

export default challengeService;
