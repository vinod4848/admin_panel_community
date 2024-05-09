import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomInput } from "../components/CustomInput";
import {
  createColor,
  getAColor,
  resetState,
  updateColor,
} from "../features/color/colorSlice";

let userSchema = Yup.object().shape({
  title: Yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getcolorId = location.pathname.split("/")[3];

  const newColor = useSelector((state) => state.color);
  const { isSuccess, isError, isLoding, createcolor, colorName, updatedColor } =
    newColor;

  useEffect(() => {
    if (getcolorId !== undefined) {
      dispatch(getAColor(getcolorId));
    } else {
      dispatch(resetState());
    }
   
  }, [dispatch, getcolorId]);

  useEffect(() => {
    if (isSuccess && createcolor) {
      toast.success("Color Added Successfully!");
    }
    if (updatedColor && isSuccess) {
      toast.success("Color Updated Successfully!");
      // navigate("/admin/list-color");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
  }, [isSuccess, isError, isLoding, createcolor, updatedColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "",
    },

    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getcolorId !== undefined) {
        const data = { id: getcolorId, colorData: values };
        dispatch(updateColor(data));
      } else {
        dispatch(createColor(values));
      }
      alert(JSON.stringify(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
        navigate("/admin/list-color");
      }, 300);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">
        {getcolorId !== undefined ? "Edit" : "Add"} Color
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          <CustomInput
            type="title"
            label="Enter Color Title"
            name="title"
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            val={formik.values.title}
            id="color"
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounde-3 my-5"
            type="submit"
          >
            {getcolorId !== undefined ? "Edit" : "Add"} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddColor;
