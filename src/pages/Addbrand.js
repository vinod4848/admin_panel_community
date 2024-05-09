import { useLocation, useNavigate } from "react-router-dom";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CustomInput } from "../components/CustomInput";
import {
  createbrand,
  getABrand,
  resetState,
  updateBrand,
} from "../features/brand/brandSlice";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Brand is Required"),
});

const AddBrand = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getbrandId = location.pathname.split("/")[3];
  const newBrand = useSelector((state) => state.brand);
  const { isSuccess, isError, isLoding, createBrand, brandName, updatedBrand } =
    newBrand;

  useEffect(() => {
    if (getbrandId !== undefined) {
      dispatch(getABrand(getbrandId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getbrandId]);

  useEffect(() => {
    if (isSuccess && createBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (updatedBrand && isSuccess) {
      toast.success("Brand Updated Successfully!");
      navigate("/admin/list-brand");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
  }, [isSuccess, isError, isLoding, createBrand, updatedBrand, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "",
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getbrandId !== undefined) {
        const data = { id: getbrandId, brandData: values };
        dispatch(updateBrand(data));
      } else {
        dispatch(createbrand(values));
      }
      alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-brand");
      }, 300);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        { getbrandId !== undefined ? "Edit" : "Add"} Brand
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Brand Name"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="brand"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounde-3 my-5"
            type="submit"
          >
            {getbrandId !== undefined ? "Edit" : "Add"} Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBrand;
