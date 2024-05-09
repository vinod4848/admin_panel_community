import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import matrimonialService from "./matrimonialservice";

export const getMatrimonial = createAsyncThunk(
  "matrimonial/getAllmatrimonial",
  async (thunkAPI) => {
    try {
      return await matrimonialService.getMatrimonials();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createMatrimonial = createAsyncThunk(
  "matrimonial/createMatrimonial",
  async (matrimonialData, thunkAPI) => {
    try {
      return await matrimonialService.createMatrimonial(matrimonialData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAAMatrimonial = createAsyncThunk(
  "matrimonial/get-matrimonial",
  async (id, thunkAPI) => {
    try {
      return await matrimonialService.getMatrimonial(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAMatrimonial = createAsyncThunk(
  "matrimonial/get-update",
  async (id, thunkAPI) => {
    try {
      return await matrimonialService.updateMatrimonial(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAMatrimonial = createAsyncThunk(
  "matrimonial/delete-matrimonial",
  async (id, thunkAPI) => {
    try {
      await matrimonialService.deleteMatrimonial(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  matrimonials: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  matrimonial: {},
  message: "",
};
export const eventSlice = createSlice({
  name: "matrimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMatrimonial.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getMatrimonial.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.matrimonials = action.payload;
      })
      .addCase(getMatrimonial.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createMatrimonial.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createMatrimonial.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdMatrimonial = action.payload;
      })
      .addCase(createMatrimonial.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAAMatrimonial.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAAMatrimonial.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.matrimonial.matrimonialData = action.payload.firstName;
        state.matrimonial.matrimonialData = action.payload.lastName;
        state.matrimonial.matrimonialData = action.payload.image;
        state.matrimonial.matrimonialData = action.payload.gender;
        state.matrimonial.matrimonialData = action.payload.email;
        state.matrimonial.matrimonialData = action.payload.phone;
        state.matrimonial.matrimonialData = action.payload.dateOfBirth;
        state.matrimonial.matrimonialData = action.payload.profession;
        state.matrimonial.matrimonialData = action.payload.income;
        state.matrimonial.matrimonialData = action.payload.nativePlace;
        state.matrimonial.matrimonialData = action.payload.height;
        state.matrimonial.matrimonialData = action.payload.family;
        state.matrimonial.matrimonialData = action.payload.address;
        state.matrimonial.matrimonialData = action.payload.education;
      })
      .addCase(getAAMatrimonial.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAMatrimonial.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAMatrimonial.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedMatrimonials = action.payload;
      })
      .addCase(updateAMatrimonial.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAMatrimonial.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAMatrimonial.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedMatrimonial = action.payload;
      })
      .addCase(deleteAMatrimonial.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default eventSlice.reducer;
