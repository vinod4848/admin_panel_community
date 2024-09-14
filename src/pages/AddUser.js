import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [userdata, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${base_url}user/getUserbyId/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data. Please try again.");
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const apiEndpoint = userId
        ? `${base_url}user/updateUser/${userId}`
        : `${base_url}user/signup`;

      const response = await axios.post(apiEndpoint, userdata);

      if (userId) {
        console.log("User Updated Successfully:", response.data);
        toast.success("User Updated Successfully!");
      } else {
        console.log("User Added Successfully:", response.data);
        toast.success("User Added Successfully!");
      }

      navigate("/admin/user-list");
    } catch (error) {
      console.error("Error:", error);

      toast.error("Error. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>{userId ? "Update User" : "Add User"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={userdata.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={userdata.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            value={userdata.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Phone:</label>
          <input
            type="number"
            name="phone"
            className="form-control"
            value={userdata.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {userId ? "Update User" : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
