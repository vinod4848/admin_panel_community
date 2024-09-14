import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../utils/base_url";

const DepartmentCategoryList = () => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${base_url}department`);
        setContactList(response.data);
      } catch (error) {
        setError("Error fetching Department info.");
        console.error("Error fetching Department info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this Department?")) {
      try {
        await axios.delete(`${base_url}department/${id}`);
        setContactList(
          contactList.filter((Department) => Department._id !== id)
        );
      } catch (error) {
        setError("Error deleting Department info.");
        console.error("Error deleting Department info:", error);
      }
    }
  };

  const handleAddContactInfo = () => {
    navigate("/admin/DepartmentCategory");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h4>Department Category List</h4>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary mb-3" onClick={handleAddContactInfo}>
          Add Department Category
        </button>
      </div>
      {contactList.map((Department) => (
        <div className="card" key={Department._id}>
          <div className="card-header">
            {Department.CommitteeName}
            <button
              className="btn btn-danger float-end"
              onClick={() => handleDelete(Department._id)}
            >
              Delete
            </button>
          </div>
          <div className="card-body">
            <p>
              <strong>Department</strong> {Department.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DepartmentCategoryList;
