import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddCommittee = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [manualData, setManualData] = useState({
    name: "",
    phone: "",
    gender: "",
    position: "",
    department: "",
    email: "",
    education: "",
    profileImage: null,
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${base_url}department`);
        if (response.status === 200) {
          setDepartments(response.data);
        } else {
          toast.error("Failed to load departments.");
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        toast.error("Error fetching departments. Please try again.");
      }
    };

    fetchDepartments();
  }, []);

  const handleManualChange = useCallback((e) => {
    const { name, value, type, files } = e.target;
    setManualData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  }, []);

  const handleManualSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const {
        name,
        phone,
        gender,
        position,
        department,
        email,
        education,
        profileImage,
      } = manualData;

      if (
        !name ||
        !phone ||
        !gender ||
        !position ||
        !department ||
        !email ||
        !education
      ) {
        toast.error("Please fill in all fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("position", position);
      formData.append("department", department);
      formData.append("email", email);
      formData.append("education", education);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      try {
        const response = await axios.post(
          `${base_url}memberProfiles`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Committee added successfully!");
          navigate("/admin/Committee-List");
        } else {
          toast.error("Error adding member. Please try again.");
        }
      } catch (error) {
        console.error("Error adding member:", error);
        toast.error("Error adding member. Please try again.");
      }
    },
    [manualData, navigate]
  );

  return (
    <div className="container mt-5">
      <h4>Add Committee</h4>
      <form onSubmit={handleManualSubmit}>
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Phone", name: "phone", type: "text" },
          {
            label: "Gender",
            name: "gender",
            type: "select",
            options: [
              { label: "Male", value: "Male" },
              { label: "Female", value: "Female" },
            ],
          },
          {
            label: "Department",
            name: "department",
            type: "select",
            options: departments.map((dept) => ({
              label: dept.title,
              
            })),
          },
          { label: "Position", name: "position", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Education", name: "education", type: "text" },
          { label: "Profile Image", name: "profileImage", type: "file" },
        ].map(({ label, name, type, options }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name}>{label}</label>
            {type === "select" ? (
              <select
                id={name}
                name={name}
                className="form-control"
                value={manualData[name]}
                onChange={handleManualChange}
                required
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                id={name}
                name={name}
                className="form-control"
                value={type === "file" ? undefined : manualData[name]}
                onChange={handleManualChange}
                required={type !== "file"}
              />
            )}
          </div>
        ))}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary form-control">
            Add Committee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommittee;
