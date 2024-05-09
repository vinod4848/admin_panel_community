import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from "./couponService";

export const getCoupans = createAsyncThunk(
  "coupon/getAllcoupon",
  async (thunkAPI) => {
    try {
      return await couponService.getCoupans();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createCoupon = createAsyncThunk(
  "coupon/createcoupon",
  async (CouponData, thunkAPI) => {
    try {
      return await couponService.createCoupon(CouponData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACoupon = createAsyncThunk(
  "Coupon/get-Coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.getCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCoupon = createAsyncThunk(
  "coupon/update-coupon",
  async (coupon, thunkAPI) => {
    try {
      return await couponService.updateACoupon(coupon);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delteACoupon = createAsyncThunk(
  "coupon/delete-coupon",
  async (id, thunkAPI) => {
    try {
      return await couponService.deleteCoupon(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  coupons: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoupans.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getCoupans.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupons = action.payload;
      })
      .addCase(getCoupans.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createCoupon.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createcoupon = action.payload;
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACoupon.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getACoupon.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.CouponName = action.payload.getcoupon.name;
        state.Couponexpiry = action.payload.getcoupon.expiry;
        state.Coupondiscount = action.payload.getcoupon.discount;
      })
      .addCase(getACoupon.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCoupon.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateCoupon.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCoupon = action.payload;
      })
      .addCase(updateCoupon.rejected, (state, action) => {

        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delteACoupon.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(delteACoupon.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedCoupon = action.payload;
      })
      .addCase(delteACoupon.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default couponSlice.reducer;
