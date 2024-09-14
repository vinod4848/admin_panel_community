import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";
import { useSelector } from "react-redux";

const AddAnnouncements = () => {
  const navigate = useNavigate();
  const getUserData = useSelector((state) => state.auth.user);

  const [announcements, setAnnouncements] = useState({
    announcementType: "",
    description: "",
    createdBy: getUserData?._id || "",
    date: "",
    image: null,
  });

  const [announcementCategories, setAnnouncementCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/announcement-categories`)
      .then((response) => setAnnouncementCategories(response.data))
      .catch((error) =>
        console.error("Error fetching announcement categories:", error)
      );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setAnnouncements((prevAnnouncements) => ({
      ...prevAnnouncements,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adResponse = await axios.post(`${base_url}/announcements`, {
        announcementType: announcements.announcementType,
        description: announcements.description,
        createdBy: announcements.createdBy,
        date: announcements.date,
      });

      const adId = adResponse.data._id;

      if (announcements.image && announcements.image instanceof File) {
        const formData = new FormData();
        formData.append("image", announcements.image);

        await axios.post(`${base_url}/announcements/${adId}`, formData);
      }

      console.log("Announcement and image added successfully");

      toast.success("Announcement and image added successfully!");

      navigate("/admin/announcements-list");
    } catch (error) {
      console.error("Error adding announcements:", error);

      toast.error("Error adding announcements. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Add Announcement</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category</label>
          <select
            name="announcementType"
            className="form-control"
            value={announcements.announcementType}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {announcementCategories.map((category) => (
              <option
                key={category._id}
                value={category.announcementCategoryName}
              >
                {category.announcementCategoryName}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={announcements.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={announcements.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add Announcement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnnouncements;
