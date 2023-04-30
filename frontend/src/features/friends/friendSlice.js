import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import friendService from "./friendService";

const initialState = {
  friends: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getFriends = createAsyncThunk(
  "friends/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendService.getFriends(token);
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

export const removeFriend = createAsyncThunk(
  "friends/delete",
  async (friend_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await friendService.removeFriend(friend_id, token);
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

export const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriends.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFriends.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = action.payload;
      })
      .addCase(removeFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.friends = state.friends.filter(
          (friend) => friend.id !== action.payload.id
        );
      })
      .addCase(removeFriend.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = friendSlice.actions;
export default friendSlice.reducer;
