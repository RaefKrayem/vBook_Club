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

// admin delete club
export const deleteClub = createAsyncThunk(
  "clubs/delete",
  async (club_id, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await clubService.deleteClub(club_id, token);
  }
);

export const createClub = createAsyncThunk(
  "clubs/create",
  async (club, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    return await clubService.createClub(club, token);
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
      })

      .addCase(deleteClub.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteClub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clubs = state.clubs.filter(
          (club) => club.id !== action.payload.id
        );
      })
      .addCase(deleteClub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createClub.pending, (state) => {
        state.isLoading = true;
      })
      // return the new club and push it to the array
      .addCase(createClub.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.clubs.push(action.payload);
      })
      .addCase(createClub.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = clubSlice.actions;
export default clubSlice.reducer;
