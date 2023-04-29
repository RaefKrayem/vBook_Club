import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import challengeReducer from "../features/challenges/challengeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengeReducer,
  },
});
