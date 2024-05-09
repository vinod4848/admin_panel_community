import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";
import {
  createcategory,
  getACategory,
  resetState,
  updateCategory,
} from "../features/productCategory/productCategorySilce";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Category is Required"),
});
const AddCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state.productCategory);
  const {
    isSuccess,
    isError,
    isLoding,
    createCategory,
    CategoryName,
    updatedCategory,
  } = newCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getCategoryId]);

  useEffect(() => {
    if (isSuccess && createCategory) {
      toast.success("Product Category Added Successfully!");
    }
    if (updatedCategory && isSuccess) {
      toast.success("Category Updated Successfully!");
      navigate("/admin/list-category");
    }

    if (isError) {
      toast.error("Somthing want wrong!");
    }
  }, [isSuccess, isLoding, isError, createCategory, updatedCategory, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: CategoryName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategory(data));
      } else {
        dispatch(createcategory(values));
      }
      alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-category");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getCategoryId !== undefined ? "Edit" : "Add"} Product Category
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Product Category Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounde-3 my-5"
            type="submit"
          >
            {getCategoryId !== undefined ? "Edit" : "Add"} Product Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
