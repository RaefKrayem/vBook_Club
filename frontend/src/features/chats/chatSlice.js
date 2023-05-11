import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import chatService from "./chatService";

const initialState = {
  chats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all chats
export const getAllChats = createAsyncThunk(
  "chats/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.getChats(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createChat = createAsyncThunk(
  "chats/create",
  async (chat, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.createChat(chat, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const accessFriendChat = createAsyncThunk(
  "chats/access",
  async (friend_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await chatService.accessFriendChat(friend_id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(getAllChats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(createChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats.push(action.payload);
      })
      .addCase(createChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(accessFriendChat.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accessFriendChat.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.chats = action.payload;
      })
      .addCase(accessFriendChat.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export const { reset } = chatSlice.actions;
export default chatSlice.reducer;
