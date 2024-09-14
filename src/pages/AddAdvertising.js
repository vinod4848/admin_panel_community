import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddAdvertisement = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [advertisement, setAdvertisement] = useState({
    clientName: "",
    companyName: "",
    bannerSize: "",
    click: "",
    image: null,
  });

  useEffect(() => {
    if (id) {
      const fetchAdvertisement = async () => {
        try {
          const response = await axios.get(`${base_url}/advertisements/${id}`);
          const existingAd = response.data;
          setAdvertisement(existingAd);
        } catch (error) {
          console.error("Error fetching advertisement details:", error);
        }
      };

      fetchAdvertisement();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setAdvertisement((prevAd) => ({
      ...prevAd,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let adResponse;

      if (id) {
        adResponse = await axios.put(`${base_url}/advertisements/${id}`, {
          clientName: advertisement.clientName,
          companyName: advertisement.companyName,
          bannerSize: advertisement.bannerSize,
          click: advertisement.click,
        });
      } else {
        adResponse = await axios.post(`${base_url}/advertisements`, {
          clientName: advertisement.clientName,
          companyName: advertisement.companyName,
          bannerSize: advertisement.bannerSize,
          click: advertisement.click,
        });
      }

      const adId = adResponse.data._id;

      if (advertisement.image && advertisement.image instanceof File) {
        // Check if a new image has been selected
        const formData = new FormData();
        formData.append("image", advertisement.image);

        await axios.post(
          `${base_url}/uploadImage/advertisements/${adId}`,
          formData
        );
      }

      console.log("Advertisement and image added/updated successfully");

      toast.success("Advertisement and image added/updated successfully!");

      navigate("/admin/advertising-list");
    } catch (error) {
      console.error("Error adding/updating advertisement:", error);

      toast.error("Error adding/updating advertisement. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>{id ? "Update" : "Add"} Advertisement</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Client Name:</label>
          <input
            type="text"
            name="clientName"
            className="form-control"
            value={advertisement.clientName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            className="form-control"
            value={advertisement.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Banner Position</label>
          <select
            name="bannerSize"
            className="form-control"
            value={advertisement.bannerSize}
            onChange={handleChange}
          >
            <option value="">Select Banner Position</option>
            <option value="topbanner">Top Banner</option>
            <option value="footerbanner">Footer Banner</option>
            <option value="sidebarbanner">Sidebar Banner</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Click:</label>
          <input
            type="text"
            name="click"
            className="form-control"
            value={advertisement.click}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            className="form-control"
            onChange={(e) =>
              setAdvertisement({ ...advertisement, image: e.target.files[0] })
            }
          />
        </div>
        {id && advertisement.image !== null && (
          <div>
            <label>Current Blog Image:</label>
            <img
              src={advertisement.image}
              alt="Current Blog"
              style={{ maxWidth: "100px" }}
            />
          </div>
        )}
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {id ? "Update" : "Add"} Advertisement
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAdvertisement;
