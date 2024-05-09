import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddAnnouncementCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [announcementCategory, setAnnouncementCategory] = useState({
    announcementCategoryName: "",
    date: "",
  });

  useEffect(() => {
    if (id) {
      axios
        .get(`${base_url}/announcement-categories/${id}`)
        .then((response) => {
          setAnnouncementCategory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching announcement category data:", error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAnnouncementCategory((prevAnnouncementCategory) => ({
      ...prevAnnouncementCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`${base_url}/announcement-categories/${id}`, {
          announcementCategoryName:
            announcementCategory.announcementCategoryName,
          date: announcementCategory.date,
        });
        console.log("Announcement category updated successfully");
        toast.success("Announcement category updated successfully!");
      } else {
        await axios.post(`${base_url}/announcement-categories`, {
          announcementCategoryName:
            announcementCategory.announcementCategoryName,
          date: announcementCategory.date,
        });
        console.log("Announcement category added successfully");
        toast.success("Announcement category added successfully!");
      }
      navigate("/admin/announcementCategoryName-list");
    } catch (error) {
      console.error("Error adding/updating announcement category:", error);
      toast.error(
        "Error adding/updating announcement category. Please try again."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h1>{id ? "Edit" : "Add"} Announcement Category</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Category Name</label>
          <input
            type="text"
            name="announcementCategoryName"
            className="form-control"
            value={announcementCategory.announcementCategoryName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={announcementCategory.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {id ? "Update" : "Add"} Announcement Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAnnouncementCategory;
