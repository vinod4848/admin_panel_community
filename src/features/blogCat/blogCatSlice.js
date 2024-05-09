import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogCatService from "./blogCatService";

export const getblogCats = createAsyncThunk(
  "blogCat/getAllblogCat",
  async (thunkAPI) => {
    try {
      return await blogCatService.getblogCats();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createBlogCat = createAsyncThunk(
  "blogCat/createblogCat",
  async (BlogCatdata, thunkAPI) => {
    try {
      return await blogCatService.createBlogCat(BlogCatdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABlogCat = createAsyncThunk(
  "BlogCat/get-BlogCat",
  async (id, thunkAPI) => {
    try {
      return await blogCatService.getBlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delteABlogCat = createAsyncThunk(
  "BlogCat/delete-BlogCat",
  async (id, thunkAPI) => {
    try {
      return await blogCatService.deleteBlogCat(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateBlogCat = createAsyncThunk(
  "BlogCat/update-BlogCat",
  async (BlogCat, thunkAPI) => {
    try {
      return await blogCatService.updateABlogCat(BlogCat);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  blogCats: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const blogCatSlice = createSlice({
  name: "blogCats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getblogCats.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getblogCats.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogCats = action.payload;
      })
      .addCase(getblogCats.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlogCat.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createBlogCat.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createblogCat = action.payload;
      })
      .addCase(createBlogCat.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlogCat.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getABlogCat.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.BlogCatName = action.payload.getblogCat.title;
      })
      .addCase(getABlogCat.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delteABlogCat.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(delteABlogCat.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedBlogCat = action.payload;
      })
      .addCase(delteABlogCat.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateBlogCat.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateBlogCat.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlogCat = action.payload;
      })
      .addCase(updateBlogCat.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogCatSlice.reducer;
