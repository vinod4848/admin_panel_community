import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddMember = () => {
  const navigate = useNavigate();
  const [manualData, setManualData] = useState({
    name: "",
    phone: "",
    gender: "",
  });

  const handleManualChange = (e) => {
    const { name, value } = e.target;
    setManualData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const { name, phone, gender } = manualData;

    if (!name || !phone || !gender) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(`${base_url}members`, {
        name,
        phone,
        gender,
      });

      if (response.status === 201) {
        toast.success("Member added successfully!");
        navigate("/admin/member-list");
      } else {
        toast.error("Error adding member. Please try again.");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      toast.error("Error adding member. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Add Member</h4>
      <form onSubmit={handleManualSubmit}>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={manualData.name}
            onChange={handleManualChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            value={manualData.phone}
            onChange={handleManualChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={manualData.gender}
            onChange={handleManualChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary form-control">
            Add Member
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
