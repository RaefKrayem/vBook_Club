import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

const initialState = {
  books: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// get saved books
export const getBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.getBooks(token);
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

// save book
export const saveBook = createAsyncThunk(
  "books/save",
  async (book, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.saveBook(book, token);
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

// unsave book
export const unsaveBook = createAsyncThunk(
  "books/unsave",
  async (book_selfLink, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.unsaveBook(book_selfLink, token);
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

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = payload;
      })
      .addCase(getBooks.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(saveBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveBook.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(payload);
      })
      .addCase(saveBook.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      })
      .addCase(unsaveBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(unsaveBook.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = state.books.filter(
          (book) => book.book_selfLink !== payload
        );
      })
      .addCase(unsaveBook.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;
