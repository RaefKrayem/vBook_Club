import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import challengeReducer from "../features/challenges/challengeSlice";
import friendSlice from "../features/friends/friendSlice";
import clubSlice from "../features/clubs/clubSlice";
import myClubSlice from "../features/myClubs/myClubSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengeReducer,
    friends: friendSlice,
    clubs: clubSlice,
    myClubs: myClubSlice,
  },
});
