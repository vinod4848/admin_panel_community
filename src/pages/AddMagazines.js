import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddMagazines = () => {
  const navigate = useNavigate();

  const [magazines, setMagazines] = useState({
    title: "",
    date: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setMagazines((prevAd) => ({
      ...prevAd,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const adResponse = await axios.post(`${base_url}/magazines`, {
        title: magazines.title,
        date: magazines.date,
       
      });

      const adId = adResponse.data._id;

      if (magazines.image && magazines.image instanceof File) {
        const formData = new FormData();
        formData.append("image", magazines.image);

        await axios.post(
          `${base_url}/uploadpdf/magazines/${adId}`,
          formData
        );
      }

      console.log("Magazines and image added successfully");

      toast.success("Magazines and image added successfully!");

      navigate("/admin/magazines-list");
    } catch (error) {
      console.error("Error adding magazines:", error);

      toast.error("Error adding magazines. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>  Add Magazines</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={magazines.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={magazines.date}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Upload Magazine Pdf</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) =>
              setMagazines({ ...magazines, image: e.target.files[0] })
            }
          />
        </div>
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
          Add Magazines
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMagazines;
