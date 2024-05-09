import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import advertisingService from "./advertisingservice";

export const getAdvertising = createAsyncThunk(
  "advertising/getAlladvertisements",
  async (thunkAPI) => {
    try {
      return await advertisingService.getadvertising();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createAdvertising = createAsyncThunk(
  "advertising/createAdvertising",
  async (advertisingdata, thunkAPI) => {
    try {
      return await advertisingService.createAdvertising(advertisingdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAAdvertising = createAsyncThunk(
  "advertising/get-advertising",
  async (id, thunkAPI) => {
    try {
      return await advertisingService.getAdvertising(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAAdvertising = createAsyncThunk(
  "advertising/get-update",
  async (id, thunkAPI) => {
    try {
      return await advertisingService.updateAdvertising(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAAdvertising = createAsyncThunk(
  "advertising/delete-advertising",
  async (id, thunkAPI) => {
    try {
      await advertisingService.deleteAdvertising(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  advertisings: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  advertising: {},
  message: "",
};
export const advertisingSlice = createSlice({
  name: "advertisings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdvertising.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAdvertising.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.advertisings = action.payload;
      })
      .addCase(getAdvertising.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createAdvertising.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createAdvertising.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdadvertising = action.payload;
      })
      .addCase(createAdvertising.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAAdvertising.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAAdvertising.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.advertising.advertisingData = action.payload.clientName;
        state.advertising.advertisingData = action.payload.companyName;
        state.advertising.advertisingData = action.payload.image;
      })
      .addCase(getAAdvertising.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAAdvertising.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAAdvertising.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedBlog = action.payload;
      })
      .addCase(updateAAdvertising.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAAdvertising.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAAdvertising.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedBlog = action.payload;
      })
      .addCase(deleteAAdvertising.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default advertisingSlice.reducer;
