import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddMember = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "text/csv") {
      toast.error("Only CSV files are supported.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${base_url}uploadMemberdata`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle response from the server
      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        navigate("/admin/member-list");
      } else {
        toast.error("Error uploading file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Upload CSV File</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="file">Upload CSV File</label>
          <input
            type="file"
            id="file"
            accept=".csv"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Upload CSV
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMember;
