import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import directorieService from "./directoryservice";

export const getDirectorie = createAsyncThunk(
  "directorie/getAllDirectorie",
  async (thunkAPI) => {
    try {
      return await directorieService.getDirectorys();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createDirectorie = createAsyncThunk(
  "directorie/createDirectorie",
  async (eventData, thunkAPI) => {
    try {
      return await directorieService.createDirectory(eventData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAADirectorie = createAsyncThunk(
  "directorie/get-directorie",
  async (id, thunkAPI) => {
    try {
      return await directorieService.getDirectory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateADirectorie = createAsyncThunk(
  "directorie/get-update",
  async (id, thunkAPI) => {
    try {
      return await directorieService.updateDirectory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteADirectorie = createAsyncThunk(
  "directorie/delete-directorie",
  async (id, thunkAPI) => {
    try {
      await directorieService.deleteDirectory(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  directories: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  directorie: {},
  message: "",
};
export const directorieSlice = createSlice({
  name: "directories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDirectorie.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getDirectorie.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.directories = action.payload;
      })
      .addCase(getDirectorie.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createDirectorie.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createDirectorie.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createddirectorie = action.payload;
      })
      .addCase(createDirectorie.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAADirectorie.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAADirectorie.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.directorie.eventData = action.payload.name;
        state.directorie.eventData = action.payload.firstName;
        state.directorie.eventData = action.payload.lastName;
        state.directorie.eventData = action.payload.address;
        state.directorie.eventData = action.payload.description;
        state.directorie.eventData = action.payload.companyName;
        state.directorie.eventData = action.payload.establishedDate;
        state.directorie.eventData = action.payload.socialMediaLinks;
        state.directorie.eventData = action.payload.tags;
      })
      .addCase(getAADirectorie.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateADirectorie.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateADirectorie.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateddirectorie = action.payload;
      })
      .addCase(updateADirectorie.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteADirectorie.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteADirectorie.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.delteddirectorie = action.payload;
      })
      .addCase(deleteADirectorie.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default directorieSlice.reducer;
