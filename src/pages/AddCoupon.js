import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";
import {
  createCoupon,
  getACoupon,
  resetState,
  updateCoupon,
} from "../features/coupon/couponSlice";

let userSchema = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  expiry: Yup.string().required("Expiry is Required"),
  discount: Yup.number().required("Discount is Required"),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcouponId = location.pathname.split("/")[3];

  const newCoupon = useSelector((state) => state.coupon);
  const { isSuccess,isError,isLoding,createcoupon,CouponName,updatedCoupon, Coupondiscount,Couponexpiry,} = newCoupon;

  useEffect(() => {
    if (getcouponId !== undefined) {
      dispatch(getACoupon(getcouponId));
    } else {
      dispatch(resetState);
    }

  }, [dispatch, getcouponId]);

  useEffect(() => {
    if (isSuccess && createcoupon) {
      toast.success("Coupon Added Successfully!");
    }
    if (updatedCoupon && isSuccess) {
      toast.success("Coupon Updated Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }

  }, [isSuccess, isError, isLoding, createcoupon, updatedCoupon]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: CouponName || "",
      expiry: Couponexpiry || "",
      discount: Coupondiscount || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getcouponId !== undefined) {
        const data = { id: getcouponId, CouponData: values };
        dispatch(updateCoupon(data));
      } else {
        dispatch(createCoupon(values));
      }
      alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/coupon-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getcouponId !== undefined ? "Edit" : "Add"}Coupon
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            name="name"
            onChange={formik.handleChange("name")}
            onBlur={formik.handleBlur("name")}
            val={formik.values.name}
            label="Enter Coupon name"
            id="coupon"
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            name="expiry"
            onChange={formik.handleChange("expiry")}
            onBlur={formik.handleBlur("expiry")}
            val={formik.values.expiry}
            label="Enter Expiry Date"
            id="date"
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            name="discount"
            onChange={formik.handleChange("discount")}
            onBlur={formik.handleBlur("discount")}
            val={formik.values.discount}
            label="Enter Discount"
            id="discount"
          />
          <div className="error">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button
            className="btn btn-success border-0 rounde-3 my-5"
            type="submit"
          >
            {getcouponId !== undefined ? "Edit" : "Add"} Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
