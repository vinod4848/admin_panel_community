import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";
import { createBlogCat, updateBlogCat } from "../features/blogCat/blogCatSlice";
import { resetState } from "../features/color/colorSlice";
import { getABlogCat } from "../features/blogCat/blogCatSlice";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Brand is Required"),
});

const AddblogCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getblogCatId = location.pathname.split("/")[3];

  const newBlogCat = useSelector((state) => state.blogCat);
  const {
    isSuccess,
    isError,
    isLoding,
    createblogCat,
    updatedBlogCat,
    BlogCatName,
  } = newBlogCat;

  useEffect(() => {
    if (getblogCatId !== undefined) {
      dispatch(getABlogCat(getblogCatId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getblogCatId]);

  useEffect(() => {
    if (isSuccess && createblogCat) {
      toast.success("Blog Category Added Successfully!");
    }
    if (updatedBlogCat && isSuccess) {
      toast.success("Blog Category Updated Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
  }, [isSuccess, isError, isLoding, createblogCat, updatedBlogCat]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: BlogCatName || "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getblogCatId !== undefined) {
        const data = { id: getblogCatId, blogCatData: values };
        dispatch(updateBlogCat(data));
      } else {
        dispatch(createBlogCat(values));
      }
      alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/blog-category-list");
      }, 3000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getblogCatId !== undefined ? "Edit" : "Add"} Blog Category
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="text"
            label="Enter Blog Category Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="blogCat"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounde-3 my-5"
            type="submit"
          >
            {getblogCatId !== undefined ? "Edit" : "Add"} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddblogCategory;
