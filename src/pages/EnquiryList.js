import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import "./EnquiryList.css";

const EnquiryList = () => {
  const [contactUsList, setContactUsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactUsData = async () => {
      try {
        const response = await axios.get(`${base_url}/ContactUs`);
        setContactUsList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact us data:", error);
        setLoading(false);
      }
    };

    fetchContactUsData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`${base_url}/ContactUs/${id}`, { status: newStatus });
      setContactUsList((prevList) =>
        prevList.map((contact) =>
          contact._id === id ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${base_url}/ContactUs/${id}`);
      setContactUsList((prevList) =>
        prevList.filter((contact) => contact._id !== id)
      );
    } catch (error) {
      console.error("Error deleting enquiry:", error);
    }
  };

  return (
    <div className="enquiry-list-container">
      <h4>Enquiry List</h4>
      {loading ? (
        <p>Loading...</p>
      ) : contactUsList.length === 0 ? (
        <p>No contact us entries found</p>
      ) : (
        <table className="enquiry-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactUsList.map((contact) => (
              <tr key={contact._id}>
                <td>
                  {contact.profileId?.firstName} {contact.profileId?.lastName}
                </td>
                <td>{contact.userId?.phone}</td>
                <td>{contact.subject}</td>
                <td>{contact.description}</td>
                <td>{contact.status}</td>
                <td className="action-cell">
                  <select
                    value={contact.status}
                    onChange={(e) =>
                      handleStatusChange(contact._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EnquiryList;
