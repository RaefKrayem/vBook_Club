import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "./messageService";

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all messages
export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (chat_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.getMessages(chat_id, token);
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

// get friend messages
export const getFriendMessages = createAsyncThunk(
  "messages/getFriendMessages",
  async ({ friend_id, chatName }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.getFriendMessages(
        { friend_id, chatName },
        token
      );
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

// send message
export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ content, chat_id }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await messageService.sendMessage({ content, chat_id }, token);
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

export const messageSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = payload;
      })
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = [...state.messages, payload];
      })
      .addCase(sendMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(getFriendMessages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriendMessages.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.messages = payload;
      })
      .addCase(getFriendMessages.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = messageSlice.actions;
export default messageSlice.reducer;
