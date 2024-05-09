import React from "react";
import { CustomInput } from "../components/CustomInput";

const ForgotPassword = () => {
  return (
    <div className="py-5" style={{ background: "#399889", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Forgot Password</h3>
        <p className="text-center">
          Please enter you register mail to get your rest mail
        </p>
        <form action="">
          <CustomInput type={"password"} label={"Email Address"} id={"email"} />
          <button
            className="border-0 px-3 py-2 text-white fw-blod w-100"
            style={{ background: "#399889" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
