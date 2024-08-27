import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { base_url } from "../utils/base_url";
import "./ContactInfoList.css";

const ContactInfoList = () => {
  const [contactList, setContactList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get(`${base_url}contactInfo`);
        setContactList(response.data);
      } catch (error) {
        setError("Error fetching contact info.");
        console.error("Error fetching contact info:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await axios.delete(`${base_url}contactInfo/${id}`);
        setContactList(contactList.filter((contact) => contact._id !== id));
      } catch (error) {
        setError("Error deleting contact info.");
        console.error("Error deleting contact info:", error);
      }
    }
  };

  const handleAddContactInfo = () => {
    navigate("/admin/ContcatInfo"); 
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Contact Info List</h1>
       <div className="d-flex justify-content-end">
    <button className="btn btn-primary mb-3" onClick={handleAddContactInfo}>
      Add Contact Info
    </button>
  </div>
      {contactList.map((contact) => (
        <div className="card" key={contact._id}>
          <div className="card-header">
            {contact.CommitteeName}
            <button
              className="btn btn-danger float-end"
              onClick={() => handleDelete(contact._id)}
            >
              Delete
            </button>
          </div>
          <div className="card-body">
            <p>
              <strong>Phone:</strong> {contact.phone}
            </p>
            <p>
              <strong>Email:</strong> {contact.email}
            </p>
            <p>
              <strong>Address:</strong> {contact.address}
            </p>
          </div>
          <div className="card-footer">
            <p>
              <strong>Facebook:</strong> {contact.socialMedia.facebook}
            </p>
            <p>
              <strong>Twitter:</strong> {contact.socialMedia.twitter}
            </p>
            <p>
              <strong>LinkedIn:</strong> {contact.socialMedia.linkedin}
            </p>
            <p>
              <strong>Instagram:</strong> {contact.socialMedia.instagram}
            </p>
            <p>
              <strong>Website:</strong> {contact.socialMedia.website}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactInfoList;
