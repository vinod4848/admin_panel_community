import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

export const getColors = createAsyncThunk(
  "color/getAllcolor",
  async (thunkAPI) => {
    try {
      return await colorService.getColors();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAColor = createAsyncThunk(
  "color/get-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.getColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createColor = createAsyncThunk(
  "color/createcolor",
  async (colorData, thunkAPI) => {
    try {
      return await colorService.createColor(colorData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateColor = createAsyncThunk(

  "color/update-color",
  async (color, thunkAPI) => {
    try {
      return await colorService.updateAColor(color);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delteAColor = createAsyncThunk(
  "color/delete-color",
  async (id, thunkAPI) => {
    try {
      return await colorService.deleteColor(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  colors: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColors.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getColors.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.colors = action.payload;
      })
      .addCase(getColors.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createcolor = action.payload;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAColor.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAColor.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.colorName = action.payload.getcolor.title;
      })
      .addCase(getAColor.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedColor = action.payload;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delteAColor.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(delteAColor.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedColor = action.payload;
      })
      .addCase(delteAColor.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default colorSlice.reducer;
