import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import challengeReducer from "../features/challenges/challengeSlice";
import friendSlice from "../features/friends/friendSlice";
import clubSlice from "../features/clubs/clubSlice";
import myClubSlice from "../features/myClubs/myClubSlice";
import chatSlice from "../features/chats/chatSlice";
import messageSlice from "../features/messages/messageSlice";
import userSlice from "../features/users/userSlice";
import bookSlice from "../features/books/bookSlice";
import commentSlice from "../features/comments/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    challenges: challengeReducer,
    friends: friendSlice,
    clubs: clubSlice,
    myClubs: myClubSlice,
    chats: chatSlice,
    messages: messageSlice,
    users: userSlice,
    books: bookSlice,
    comments: commentSlice,
  },
});
