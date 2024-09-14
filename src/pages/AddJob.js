import React, { useState } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const AddJob = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    description: "",
    responsibilities: [],
    qualifications: [],
    skills: [],
    employmentType: "",
    experienceLevel: "",
    educationLevel: "",
    salary: 0,
    applicationDeadline: "",
    contactEmail: "",
    isPublished: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({ ...prevJob, [name]: value }));
  };

  const handleArrayChange = (e, field) => {
    const value = e.target.value;
    setJob((prevJob) => ({ ...prevJob, [field]: [value] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${base_url}/jobs`, job);
      console.log("Job added successfully:", response.data);
      toast.success("Job added successfully!");
      navigate("/admin/job-list");
    } catch (error) {
      console.error("Error adding job:", error);

      toast.error("Error adding job. Please try again.");
    }
  };
  <ToastContainer position="top-center" autoClose={3000} hideProgressBar />;
  return (
    <div className="container mt-5">
      <h4>Add Job</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={job.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Company:</label>
          <input
            type="text"
            name="company"
            className="form-control"
            value={job.company}
            onChange={handleChange}
          />
        </div>
       
       
        <div className="mb-3">
        <label>Responsibilities:</label>
        <input
          type="text"
          className="form-control"
          value={job.responsibilities[0]}
            onChange={(e) => handleArrayChange(e, "responsibilities")}
        />
      </div>
      <div className="mb-3">
        <label>Qualifications:</label>
        <input
          type="text"
          className="form-control"
          value={job.qualifications[0]}
            onChange={(e) => handleArrayChange(e, "qualifications")}
        />
      </div>
      <div className="mb-3">
        <label>Skills:</label>
        <input
          type="text"
          className="form-control"
          value={job.skills[0]}
            onChange={(e) => handleArrayChange(e, "skills")}
        />
      </div>
        <div className="mb-3">
          <label>Employment Type:</label>
          <input
            type="text"
            className="form-control"
            name="employmentType"
            value={job.employmentType}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Experience Level:</label>
          <input
            type="text"
            className="form-control"
            name="experienceLevel"
            value={job.experienceLevel}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Education Level:</label>
          <input
            type="text"
            className="form-control"
            name="educationLevel"
            value={job.educationLevel}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Salary:</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={job.salary}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Application Deadline:</label>
          <input
            type="date"
            className="form-control"
            name="applicationDeadline"
            value={job.applicationDeadline}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Contact Email:</label>
          <input
            type="email"
            className="form-control"
            name="contactEmail"
            value={job.contactEmail}
            onChange={handleChange}
          />
        </div>
        
        <div className="mb-3">
          <label>Description:</label>
          <textarea
            name="description"
            className="form-control"
            value={job.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button
            type="submit"
            className="btn btn-success border-0 rounde-3 my-5"
          >
            Add Job
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
