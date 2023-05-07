import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get all comments
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (book_selfLink, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.getComments(book_selfLink, token);
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

// create comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async (comment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.addComment(comment, token);
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

// delete comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (comment_id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.deleteComment(comment_id, token);
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

export const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getComments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = payload;
        // state.comments = [];
      })
      .addCase(getComments.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.comments = payload;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments.push(payload);
      })
      .addCase(addComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = state.comments.filter(
          (comment) => comment.id !== payload
        );
      })
      .addCase(deleteComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
