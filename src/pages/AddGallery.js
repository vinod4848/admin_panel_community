import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddGallery = () => {
  const navigate = useNavigate();

  const [gallery, setGallery] = useState({
    Albumtitle: "",
    image: [],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setGallery((prevGallery) => ({
      ...prevGallery,
      [name]: name === "image" ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const galleryResponse = await axios.post(`${base_url}/gallery`, {
        Albumtitle: gallery.Albumtitle,
      });

      const galleryId = galleryResponse.data._id;

      if (gallery.image.length > 0) {
        const formData = new FormData();

        for (const image of gallery.image) {
          formData.append("image", image);
        }

        await axios.post(`${base_url}/gallery/image/${galleryId}`, formData);
      }

      console.log("Gallery and image added successfully");

      toast.success("Gallery and image added successfully!");

      navigate("/admin/gallery-list");
    } catch (error) {
      console.error("Error adding gallery:", error);

      toast.error("Error adding gallery. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>Add Gallery</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Album title</label>
          <input
            type="text"
            name="Albumtitle"
            className="form-control"
            value={gallery.Albumtitle}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Upload Images</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) => setGallery({ ...gallery, image: e.target.files })}
            multiple
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add Gallery
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddGallery;
