import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import productService from "./productService";

export const getAllProduct = createAsyncThunk(
  "product/get-AllProduct",
  async (thunkAPI) => {
    try {
      return await productService.getAllProduct();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const createProduct = createAsyncThunk(
  "product/addProduct",
  async (productdata, thunkAPI) => {
    try {
      return await productService.createProduct(productdata);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getAProduct = createAsyncThunk(
  "product/get-product",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const delteAProduct = createAsyncThunk(
  "product/delete-product",
  async (id, thunkAPI) => {
    try {
      return await productService.deletProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateAProduct = createAsyncThunk(
  "product/update-product",
  async (product, thunkAPI) => {
    debugger;
    try {
      return await productService.updateProduct(product);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const resetState = createAction("Reset_all");
const initialState = {
  products: [],
  isError: false,
  isLoding: false,
  isSuccess: false,
  message: "",
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(getAllProduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getAllProduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.createProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoding = true;
      })

      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.productName = action.payload.getProduct.title;
        state.productdescription = action.payload.getProduct.description;
        state.productprice = action.payload.getProduct.price;
        state.productbrand = action.payload.getProduct.brand;
        state.productcategory = action.payload.getProduct.category;
        state.productcolor = action.payload.getProduct.color;
        state.productquantity = action.payload.getProduct.quantity;
        state.productimages = action.payload.getProduct.images;
        state.tags = action.payload.getProduct.tags;
      })

      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(delteAProduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(delteAProduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.deltedProduct = action.payload;
      })
      .addCase(delteAProduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAProduct.pending, (state) => {
        state.isLoding = true;
      })
      .addCase(updateAProduct.fulfilled, (state, action) => {
        state.isLoding = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateAProduct.rejected, (state, action) => {
        state.isLoding = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});

export default productSlice.reducer;
