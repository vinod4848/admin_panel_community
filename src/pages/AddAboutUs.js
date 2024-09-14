import React, { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddAboutUs = () => {
  const navigate = useNavigate();
  const [aboutUsData, setAboutUsData] = useState({
    title: "",
    description: "",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setAboutUsData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      const { title, description } = aboutUsData;

      if (!title || !description) {
        toast.error("Please fill in all required fields.");
        return;
      }

      try {
        const response = await axios.post(`${base_url}aboutUs`, {
          title,
          description,
        });

        if (response.status === 201) {
          toast.success("About Us info added successfully!");
          navigate("/admin/AboutUs-List");
        } else {
          toast.error("Error adding About Us info. Please try again.");
        }
      } catch (error) {
        console.error("Error adding About Us info:", error);
        toast.error("Error adding About Us info. Please try again.");
      }
    },
    [aboutUsData, navigate]
  );

  return (
    <div className="container mt-5">
      <h4>Add About Us Info</h4>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Title", name: "title", type: "text" },
          { label: "Description", name: "description", type: "text" },
        ].map(({ label, name, type }) => (
          <div className="mb-3" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              type={type}
              id={name}
              name={name}
              className="form-control"
              value={aboutUsData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="mb-3">
          <button type="submit" className="btn btn-primary form-control">
            Add About Us Info
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAboutUs;
