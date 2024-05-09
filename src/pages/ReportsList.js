import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { Space, Image, Button } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";

const ReportsList = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${base_url}/reports`);
        const data = response.data;
        setReports(data);
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchData();
  }, []);

  const handleStatusUpdate = async (reportId, newStatus) => {
    try {
      await axios.put(`${base_url}/reports/${reportId}`, {
        status: newStatus,
      });
      const updatedReports = await fetchData();
      setReports(updatedReports);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleProfileBlock = async (profileId, isBlocked) => {
    try {
      await axios.put(`${base_url}/profiles/${profileId}`, {
        blocked: isBlocked,
      });
      const updatedReports = await fetchData();
      setReports(updatedReports);
    } catch (error) {
      console.error("Error updating profile status:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/reports`);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching reports:", error);
      return [];
    }
  };

  const renderTable = (data) => (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Status</th>
          <th>Description</th>
          <th>Screenshots</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((report) => (
          <tr key={report._id}>
            <td>{report.status}</td>
            <td>{report.description}</td>
            <td>
              <Space size={[8, 8]} wrap>
                {report.images.map((image, index) => (
                  <Image
                    key={index}
                    src={image}
                    alt={`Image ${index + 1}`}
                    style={{
                      maxWidth: "100px",
                      maxHeight: "50px",
                      marginBottom: "10px",
                      borderRadius: "4px",
                    }}
                  />
                ))}
              </Space>
            </td>
            <td>
              <Button
                type="primary"
                onClick={() => handleStatusUpdate(report._id, "InProgress")}
                style={{ marginRight: "8px" }}
              >
                InProgress
              </Button>
              <Button
                type="primary"
                onClick={() => handleStatusUpdate(report._id, "Resolved")}
              >
                Resolved
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderProfileTable = (title, profileData) => (
    <table className="table" style={{ marginTop: "-17px" }}>
      <thead>
        <tr>
          <th>{title}</th>
          <th>Date of Birth</th>
          <th>Gender</th>
          <th>Address</th>
          <th>Profile</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {profileData.map((profile) => (
          <tr key={profile._id}>
            <td>{`${profile.firstName} ${profile.lastName}`}</td>
            <td>{new Date(profile.dateOfBirth).toLocaleDateString()}</td>
            <td>{profile.gender}</td>
            <td>
              {`${profile.address.street},
               ${profile.address.city},
                ${profile.address.state},
                 ${profile.address.country} 
                 ${profile.address.postalCode}`}
            </td>
            <td>
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt="User"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "100px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                />
              ) : profile.url ? (
                <Image
                  src={profile.url}
                  alt="User"
                  style={{
                    maxWidth: "150px",
                    maxHeight: "100px",
                    marginBottom: "10px",
                    borderRadius: "4px",
                  }}
                />
              ) : (
                <span>No image available</span>
              )}
            </td>

            <td>
              {profile.blocked ? (
                <Button
                  type="primary"
                  onClick={() => handleProfileBlock(profile._id, false)}
                >
                  Unblock
                </Button>
              ) : (
                <Button
                  type="danger"
                  onClick={() => handleProfileBlock(profile._id, true)}
                >
                  Block
                </Button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container">
      <h1 className="text-center mb-4">Reports</h1>
      {reports.map((report) => (
        <div key={report._id}>
          {renderTable([report])}
          {report.reportBy &&
            renderProfileTable("Reported By", [report.reportBy])}
          {report.assignedTo &&
            renderProfileTable("Assigned To", [report.assignedTo])}
        </div>
      ))}
    </div>
  );
};

export default ReportsList;
