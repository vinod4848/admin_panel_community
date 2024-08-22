import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
import { RiSearchLine } from "react-icons/ri";
import { base_url } from "../utils/base_url";

const UserListV1 = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/profiles`);
      setProfileData(response.data);
      console.log("Fetched data:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch profile data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLockProfile = async (profileId) => {
    try {
      const response = await axios.get(`${base_url}/profiles/${profileId}`);
      const currentProfile = response.data;

      const updatedProfile = {
        ...currentProfile,
        locked: !currentProfile.locked,
      };
      await axios.put(`${base_url}/profiles/${profileId}`, updatedProfile);
      fetchData();
    } catch (error) {
      console.error("Error locking/unlocking profile:", error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const filteredData = profileData.filter((profile) => {
    const fullName = `${profile.firstName} ${profile.lastName}`.toLowerCase();
    const query = searchQuery.toLowerCase();
    const hasPhone = profile.userId && profile.userId.phone;
    return (
      fullName.includes(query) ||
      (hasPhone && profile.userId.phone.includes(query))
    );
  });

  return (
    <div className="container">
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <RiSearchLine />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Name or Phone"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <h1 className="title">Profile Details</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
        {filteredData.map((profile) => (
          <div key={profile._id} className="col">
            <div className="card h-100 d-flex flex-column justify-content-between">
              <div className="lock-buttons">
                <button
                  className={`lock-button ${
                    profile.locked ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => handleLockProfile(profile._id)}
                >
                  {profile.locked ? "Unblock" : "Block"}
                </button>
              </div>
              {profile.url ? (
                <img
                  src={profile.url}
                  className="card-img-top"
                  alt="Profile"
                  style={{ height: "150px", objectFit: "cover" }}
                />
              ) : profile.url ? (
                <p className="small">{profile.url}</p>
              ) : (
                <p className="small">No image or URL available</p>
              )}

              <div className="card-body">
                <h6 className="card-title">{`${profile.firstName} ${profile.lastName}`}</h6>
                <div className="d-flex justify-content-between">
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>Father's Name:</strong>{" "}
                      {profile.family?.fatherName || "Not Available"}
                    </p>
                  </div>
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>Mother's Name:</strong>{" "}
                      {profile.family?.motherName || "Not Available"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>Marital Status:</strong>{" "}
                      {profile.maritalStatus || "Not Available"}
                    </p>
                  </div>
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>Profession:</strong>{" "}
                      {profile.profession || "Not Available"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>DOB:</strong>{" "}
                      {profile.dateOfBirth
                        ? new Date(profile.dateOfBirth).toLocaleDateString()
                        : "Not Available"}
                    </p>
                  </div>
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>Gender:</strong>{" "}
                      {profile.gender || "Not Available"}
                    </p>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="flex-fill">
                    <p className="card-text small">
                      <strong>Phone:</strong>{" "}
                      {profile.userId?.phone || "Not Available"}
                    </p>
                  </div>
                </div>
                <p className="card-text small">
                  <strong>Address:</strong>{" "}
                  {profile.address
                    ? `${profile.address.street},
                     ${profile.address.city}, 
                     ${profile.address.state}, 
                     ${profile.address.country},
                      ${profile.address.postalCode}`
                    : "Not Available"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserListV1;
