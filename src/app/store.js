import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import brandReducer from "../features/brand/brandSlice";
import blogReducer from "../features/blog/blogSlice";
import blogCatReducer from "../features/blogCat/blogCatSlice";
import productCategoryReducer from "../features/productCategory/productCategorySilce";
import colorReducer from "../features/color/colorSlice";
import enquirieReducer from "../features/enquiries/enquiriesSilce";
import couponReducer from "../features/coupon/couponSlice";
import uploadReducer from "../features/upload/uploadSlice";
import advertisingReducer from "../features/advertising/advertisingSlice";
import eventReducer from "../features/event/eventSlice";
import jobReducer from "../features/job/jobSlice";
import newsReducer from "../features/news/newSlice";
import matrimonialReducer from "../features/matrimonial/matrimonialSlice";
import directorieReducer from "../features/directory/directorySlice";
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user:userReducer,
    customer: customerReducer,
    product: productReducer,
    brand: brandReducer,
    blog: blogReducer,
    blogCat: blogCatReducer,
    productCategory: productCategoryReducer,
    color: colorReducer,
    enquirie: enquirieReducer,
    coupon: couponReducer,
    upload: uploadReducer,
    advertising: advertisingReducer,
    event: eventReducer,
    job: jobReducer,
    news: newsReducer,
    matrimonial: matrimonialReducer,
    directorie: directorieReducer,
  },
});
