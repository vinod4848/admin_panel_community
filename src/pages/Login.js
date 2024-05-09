import React, { useEffect } from "react";
import { CustomInput } from "../components/CustomInput";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import background from "../bgimg.jpg";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let userSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email Should  be vailid")
      .required("Email is Required"),
    password: Yup.string().required("Pasword is Required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });
  const authState = useSelector((state) => state);
  const { user, isLoding, isError, isSuccess, isMessage } = authState.auth;

  useEffect(() => {
    if (isSuccess && isMessage) {
      toast.success("Login Successfully!");
    }
    if (isError) {
      toast.error("Somthing want wrong!");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, isError, isLoding]);

  useEffect(() => {
    if (isSuccess) {
      navigate("admin");
    } else {
      navigate("");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoding, isError, isSuccess]);

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
      }}
    >
      <br />
      <br />
      <br />
      <br />
      <br />
      <div
        className="my-6 w-25 rounded-3 mx-auto p-4"
        style={{ backgroundColor: "rgba(47,79,79,0.6)" }}
      >
        <h3 className="text-center text-white">Login</h3>
        <p className="text-center text-white">Log in to your account</p>

        <div className=" error text-center">
          {isMessage.message === "Rejected"
            ? "Please check your Email and Password"
            : ""}
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="email"
            label="Email "
            id="email"
            val={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleChange("email")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <CustomInput
            type="password"
            name="password"
            label="Password"
            id="pass"
            val={formik.values.password}
            onChange={formik.handleChange("password")}
            onBlur={formik.handleChange("password")}
          />
          <div className="error">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}
          </div>
          <div className="mb-3 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <button
            className="border-0 px-3 py-2 text-white fw-blod w-100 text-center text-decoration-none fs-5"
            style={{ background: "#399889" }}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
