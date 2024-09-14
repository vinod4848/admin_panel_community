import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../utils/base_url";

const AboutUsList = () => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${base_url}aboutUs`);
        setContactList(response.data);
      } catch (error) {
        setError("Error fetching aboutUs info.");
        console.error("Error fetching aboutUs info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`${base_url}aboutUs/${id}`);
        setContactList(contactList.filter((aboutUs) => aboutUs._id !== id));
      } catch (error) {
        setError("Error deleting item.");
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleAddAboutUs = () => {
    navigate("/admin/AboutUs");
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h4>About Us</h4>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary mb-3" onClick={handleAddAboutUs}>
          Add About Us
        </button>
      </div>
      {contactList.map((aboutUs) => (
        <div className="card" key={aboutUs._id}>
          <div className="card-header">
            {aboutUs.title}
            <button
              className="btn btn-danger float-end"
              onClick={() => handleDelete(aboutUs._id)}
            >
              Delete
            </button>
          </div>
          <div className="card-body">
            <p>
              <strong>Title:</strong> {aboutUs.title}
            </p>
            <p>
              <strong>Description:</strong> {aboutUs.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutUsList;
