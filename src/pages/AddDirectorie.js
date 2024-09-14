import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddDirectory = () => {
  const navigate = useNavigate();
  const { directoryId } = useParams();

  const initialDirectoryState = {
    name: "",
    firstName: "",
    lastName: "",
    address: "",
    description: "",
    companyName: "",
    establishedDate: "",
    socialMediaLinks: {
      facebook: "",
      twitter: "",
      linkedin: "",
    },
    tags: [],
  };

  const [directory, setDirectory] = useState(initialDirectoryState);

  useEffect(() => {
    const fetchDirectory = async () => {
      try {
        if (directoryId) {
          const response = await axios.get(
            `${base_url}/directories/${directoryId}`
          );
          const updatedData = {
            ...response.data,
            establishedDate: new Date(
              response.data.establishedDate
            ).toLocaleDateString(),
          };

          setDirectory(updatedData);
        }
      } catch (error) {
        console.error("Error fetching directory:", error);
      }
    };

    fetchDirectory();
  }, [directoryId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDirectory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setDirectory((prevData) => ({
      ...prevData,
      socialMediaLinks: {
        ...prevData.socialMediaLinks,
        [platform]: value,
      },
    }));
  };

  const handleTagsChange = (e) => {
    const { value } = e.target;
    setDirectory((prevData) => ({
      ...prevData,
      tags: value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (directoryId) {
        await axios.put(`${base_url}/directories/${directoryId}`, directory);
        console.log("Directory updated successfully");

        toast.success("Directory updated successfully!");
      } else {
        await axios.post(`${base_url}/directories`, directory);
        console.log("Directory added successfully");

        toast.success("Directory added successfully!");
      }

      setDirectory(initialDirectoryState);

      navigate("/admin/directory-list");
    } catch (error) {
      console.error("Error adding/updating directory:", error);

      toast.error("Error adding/updating directory. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>{directoryId ? "Edit Directory" : "Add Directory"}</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label> Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={directory.name}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> First Name:</label>
          <input
            type="text"
            name="firstName"
            className="form-control"
            value={directory.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Last Name: </label>
          <input
            type="text"
            name="lastName"
            className="form-control"
            value={directory.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Address: </label>

          <input
            type="text"
            name="address"
            className="form-control"
            value={directory.address}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Description:</label>

          <textarea
            name="description"
            className="form-control"
            value={directory.description}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Company Name:</label>

          <input
            type="text"
            name="companyName"
            className="form-control"
            value={directory.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Tags </label>
          <input
            type="text"
            name="tags"
            className="form-control"
            value={directory.tags.join(",")}
            onChange={handleTagsChange}
          />
        </div>
        <div className="mb-3">
          <label> Established Date: </label>

          <input
            type="date"
            name="establishedDate"
            className="form-control"
            value={directory.establishedDate}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label> Facebook: </label>

          <input
            type="text"
            name="facebook"
            className="form-control"
            value={directory.socialMediaLinks.facebook}
            onChange={(e) =>
              handleSocialMediaChange("facebook", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <label> Twitter:</label>

          <input
            type="text"
            name="twitter"
            className="form-control"
            value={directory.socialMediaLinks.twitter}
            onChange={(e) => handleSocialMediaChange("twitter", e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label> LinkedIn:</label>

          <input
            type="text"
            name="linkedin"
            className="form-control"
            value={directory.socialMediaLinks.linkedin}
            onChange={(e) =>
              handleSocialMediaChange("linkedin", e.target.value)
            }
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {directoryId ? "Update Directory" : "Add Directory"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDirectory;
