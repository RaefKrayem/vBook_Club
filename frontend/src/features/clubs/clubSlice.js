import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import clubService from "./clubService";

const initialState = {
  clubs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all clubs
export const getAllClubs = createAsyncThunk(
  "clubs/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await clubService.getClubs(token);
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

// join club
export const joinClub = createAsyncThunk(
  "clubs/join",
  async (club_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await clubService.joinClub(club_id, token);
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

export const clubSlice = createSlice({
  name: "clubs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClubs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllClubs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clubs = action.payload;
      })
      .addCase(getAllClubs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(joinClub.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(joinClub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.myClubs.push(action.payload);
      })
      .addCase(joinClub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = clubSlice.actions;
export default clubSlice.reducer;
