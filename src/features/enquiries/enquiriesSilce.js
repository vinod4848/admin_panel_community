import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import enquirieService from "./enquiriesService";

export const getAllenqs = createAsyncThunk(
  "enq/getAllenq",
  async (thunkAPI) => {
    try {
      return await enquirieService.getenquiries();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteAEnquiry = createAsyncThunk(
  "enquiry/delete-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquirieService.deleteEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAEnquiry = createAsyncThunk(
  "enquiry/get-enquiry",
  async (id, thunkAPI) => {
    try {
      return await enquirieService.getEnquiry(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAEnquiry = createAsyncThunk(
  "enquiry/update-enquiry",
  async (enq, thunkAPI) => {
    try {
      return await enquirieService.udpateEnquiry(enq);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");

const initialState = {
  enquiries: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const enquirieSlice = createSlice({
  name: "enquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllenqs.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllenqs.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.enquiries = action.payload;
      })
      .addCase(getAllenqs.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteAEnquiry.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(deleteAEnquiry.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedEnquiry = action.payload;
      })
      .addCase(deleteAEnquiry.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAEnquiry.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAEnquiry.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.enqName = action.payload.getenq.name;
        state.enqMobile = action.payload.getenq.phone;
        state.enqEmail = action.payload.getenq.email;
        state.enqComment = action.payload.getenq.comment;
        state.enqStatus = action.payload.getenq.status;
      })
      .addCase(getAEnquiry.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAEnquiry.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAEnquiry.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedEnquiry = action.payload;
      })
      .addCase(updateAEnquiry.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default enquirieSlice.reducer;
