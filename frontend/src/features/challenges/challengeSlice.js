import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import challengeService from "./challengeService";

const initialState = {
  challenges: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// create new challenge
export const createChallenge = createAsyncThunk(
  "challenges/create",
  async (challengeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await challengeService.createChallenge(challengeData, token);
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

// get all challenges
export const getAllChallenges = createAsyncThunk(
  "challenges/getAll",
  // we don't need to pass any data to the service function (getChallenges)
  // so we can just pass an underscore ( _ ) as the first argument
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await challengeService.getChallenges(token);
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

// delete user challenge
export const deleteChallenge = createAsyncThunk(
  "challenges/delete",
  async (challenge_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await challengeService.deleteChallenge(challenge_id, token);
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

// update user challenge
export const updateChallenge = createAsyncThunk(
  "challenges/update",
  async ({ challenge }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await challengeService.updateChallenge({ challenge }, token);
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

export const challengeSlice = createSlice({
  name: "challenges",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChallenge.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createChallenge.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.challenges.push(action.payload);
      })
      .addCase(createChallenge.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllChallenges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.challenges = action.payload;
      })
      // .addCase(getAllChallenges.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload.message;
      // })
      .addCase(deleteChallenge.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteChallenge.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.challenges = state.challenges.filter(
          (challenge) => challenge.id !== action.payload.id
        );
      })
      .addCase(deleteChallenge.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateChallenge.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateChallenge.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(updateChallenge.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = challengeSlice.actions;
export default challengeSlice.reducer;
