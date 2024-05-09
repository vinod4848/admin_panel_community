import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

export const getBlog = createAsyncThunk("blog/getAllBlog", async (thunkAPI) => {
  try {
    return await blogService.getblogs();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createBlog = createAsyncThunk(
  "blog/createBlog",
  async (Blogdata, thunkAPI) => {
    try {
      return await blogService.createBlog(Blogdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getABlog = createAsyncThunk(
  "blog/get-blog",
  async (id, thunkAPI) => {
    try {
      return await blogService.getBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateABlog = createAsyncThunk(
  "blog/get-update",
  async (id, thunkAPI) => {
    try {
      return await blogService.updateBlog(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteABlog = createAsyncThunk(
  "blog/delete-blog",
  async (id, thunkAPI) => {
    try {
      await blogService.deleteBlog(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  blogs: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  blog: {},
  message: "",
};
export const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlog.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createblog = action.payload;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getABlog.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getABlog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.blog.blogName = action.payload.title;
        state.blog.blogDescription = action.payload.description;
        state.blog.blogImage = action.payload.images;
      })
      .addCase(getABlog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateABlog.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateABlog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateABlog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteABlog.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteABlog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedBlog = action.payload;
      })
      .addCase(deleteABlog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default blogSlice.reducer;
