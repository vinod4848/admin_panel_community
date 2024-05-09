import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import newService from "./newservice";

export const getNew = createAsyncThunk("news/getAllNews", async (thunkAPI) => {
  try {
    return await newService.getNews();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
export const createNew = createAsyncThunk(
  "news/createNew",
  async (newData, thunkAPI) => {
    try {
      return await newService.createNewService(newData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAANew = createAsyncThunk(
  "news/get-news",
  async (id, thunkAPI) => {
    try {
      return await newService.getNew(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateANew = createAsyncThunk(
  "news/get-update",
  async (id, thunkAPI) => {
    try {
      return await newService.updateNew(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteANew = createAsyncThunk(
  "news/delete-news",
  async (id, thunkAPI) => {
    try {
      await newService.deleteNew(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  newss: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  news: {},
  message: "",
};
export const jobSlice = createSlice({
  name: "newss",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNew.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getNew.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.newss = action.payload;
      })
      .addCase(getNew.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createNew.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createNew.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdNew = action.payload;
      })
      .addCase(createNew.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAANew.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAANew.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.news.newData = action.payload.title;
        state.news.newData = action.payload.content;
        state.news.newData = action.payload.category;
        state.news.newData = action.payload.tags;
        state.news.newData = action.payload.image;
      })
      .addCase(getAANew.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateANew.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateANew.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedNews = action.payload;
      })
      .addCase(updateANew.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteANew.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteANew.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedNews = action.payload;
      })
      .addCase(deleteANew.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default jobSlice.reducer;
