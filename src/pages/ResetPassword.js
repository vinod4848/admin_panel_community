import React from "react";
import { CustomInput } from "../components/CustomInput";

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ background: "#399889", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center"> Please enter your new password</p>
        <form action="">
          <CustomInput type={"text"} label={"Email Address"} id={"email"} />
          <CustomInput type={"password"} label={"Password"} id={"pass"} />
          <button
            className="border-0 px-3 py-2 text-white fw-blod w-100"
            style={{ background: "#399889" }}
            type="submit"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
