import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import ProductCategoryService from "./productCategoryService";

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  async (thunkAPI) => {
    try {
      return await ProductCategoryService.getAllCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getACategory = createAsyncThunk(
  "category/get-category",
  async (id, thunkAPI) => {
    try {
      return await ProductCategoryService.getCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createcategory = createAsyncThunk(
  "category/category",
  async (categorydata, thunkAPI) => {
    try {
      return await ProductCategoryService.createCategory(categorydata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateCategory = createAsyncThunk(
  "category/update-category",
  async (category, thunkAPI) => {
    try {
      return await ProductCategoryService.updateACategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delteACategory = createAsyncThunk(
  "category/delete-category",
  async (id, thunkAPI) => {
    try {
      return await ProductCategoryService.deleteCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  prodcategories: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const productCategorySlice = createSlice({
  name: "prodcategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.prodcategories = action.payload;
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createcategory.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createcategory.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createCategory = action.payload;
      })
      .addCase(createcategory.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getACategory.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getACategory.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.CategoryName = action.payload.getCategory.title;
      })
      .addCase(getACategory.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateCategory.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCategory = action.payload;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delteACategory.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(delteACategory.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedCategory = action.payload;
      })
      .addCase(delteACategory.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productCategorySlice.reducer;
