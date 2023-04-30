import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import myClubService from "./myClubService";

const initialState = {
  myClubs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get joined clubs
export const getMyClubs = createAsyncThunk(
  "myclubs/getMyClubs",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await myClubService.getMyClubs(token);
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

// leave club
export const leaveClub = createAsyncThunk(
  "myclubs/leave",
  async (club_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await myClubService.leaveClub(club_id, token);
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

export const myClubSlice = createSlice({
  name: "myclubs",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyClubs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyClubs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myClubs = action.payload;
      })
      // .addCase(getMyClubs.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.message = action.payload.message;
      // })
      .addCase(leaveClub.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(leaveClub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.myClubs = state.myClubs.filter(
          (myClub) => myClub.id !== action.payload.id
        );
        // state.myClubs = action.payload;
      })
      .addCase(leaveClub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = myClubSlice.actions;
export default myClubSlice.reducer;
