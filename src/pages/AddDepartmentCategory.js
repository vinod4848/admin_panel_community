import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddDepartmentCategory = () => {
  const navigate = useNavigate();
  const [departmentData, setDepartmentData] = useState({
    title: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setDepartmentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { title } = departmentData;

      if (!title) {
        toast.error("Please fill in the title.");
        return;
      }

      try {
        const response = await axios.post(`${base_url}department`, {
          title,
        });

        if (response.status === 201) {
          toast.success("Department added successfully!");
          navigate("/admin/DepartmentCategory-List");
        } else {
          toast.error("Error adding department. Please try again.");
        }
      } catch (error) {
        console.error("Error adding department:", error);
        toast.error("Error adding department. Please try again.");
      }
    },
    [departmentData, navigate]
  );

  return (
    <div className="container mt-5">
      <h1>Add Department</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-control"
            value={departmentData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-primary form-control">
            Add Department
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentCategory;
