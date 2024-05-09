import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

export const uploadImages = createAsyncThunk(
  "upload/images",
  async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      for (let i = 0; i < data.length; i++) {
        formData.append("images", data[i]);
      }
      return await uploadService.uploadImages(formData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const dellImages = createAsyncThunk(
  "delete/images",
  async (id, thunkAPI) => {
    try {
      return await uploadService.deleteImages(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadImageOfblog = createAsyncThunk(
  "uploadImage/blogs",
  async (id, thunkAPI) => {
    try {
      return await uploadService.uploadBlogimage(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  images: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const uploadSlice = createSlice({
  name: "images",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImages.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(dellImages.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(dellImages.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(dellImages.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(uploadImageOfblog.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(uploadImageOfblog.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.images = [];
      })
      .addCase(uploadImageOfblog.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });

  },
});

export default uploadSlice.reducer;
