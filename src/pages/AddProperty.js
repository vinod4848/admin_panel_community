import React, { useState } from "react";
import { base_url } from "../utils/base_url";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const AddProperty = () => {
  const navigate = useNavigate();
  const getUserData = useSelector((state) => state.auth.user);
  const [propertyData, setPropertyData] = useState({
    userId: getUserData?._id || "",
    propertyFor: "",
    address: "",
    landmark: "",
    proprietorshipTypes: "",
    propertyType: "",
    bathrooms: "",
    bedrooms: "",
    furnishing: "",
    superBuiltupArea: "",
    carpetArea: "",
    maintenanceMonthly: "",
    totalFloors: "",
    floorNo: "",
    carParking: "",
    facing: "",
    adTitle: "",
    description: "",
    price: "",
    images: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const imagesArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setPropertyData({ ...propertyData, images: imagesArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${base_url}properties`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        console.log("Property added successfully!");
      } else {
        console.error("Failed to add property:", response.statusText);
      }
      navigate("/admin/property-list");
    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Property</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Property For:</label>
          <select
            name="propertyFor"
            className="form-control"
            value={propertyData.propertyFor}
            onChange={handleInputChange}
          >
            <option value="">Select Property For</option>
            <option value="For Sale: Houses & Apartments">
              For Sale: Houses & Apartments
            </option>
            <option value="For Rent: Houses & Apartments">
              For Rent: Houses & Apartments
            </option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Address:</label>
          <input
            type="text"
            name="address"
            className="form-control"
            value={propertyData.address}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Landmark:</label>
          <input
            type="text"
            name="landmark"
            className="form-control"
            value={propertyData.landmark}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Proprietorship Types:</label>
          <select
            name="proprietorshipTypes"
            className="form-control"
            value={propertyData.proprietorshipTypes}
            onChange={handleInputChange}
          >
            <option value="">Select Proprietorship Type</option>
            <option value="Ownership">Ownership</option>
            <option value="Pagdi">Pagdi</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Property Type:</label>
          <select
            name="propertyType"
            className="form-control"
            value={propertyData.propertyType}
            onChange={handleInputChange}
          >
            <option value="">Select Property Type</option>
            <option value="Apartments">Apartments</option>
            <option value="Builder Floors">Builder Floors</option>
            <option value="Farm Houses">Farm Houses</option>
            <option value="Houses & Villas">Houses & Villas</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Bathrooms:</label>
          <select
            name="bathrooms"
            className="form-control"
            value={propertyData.bathrooms}
            onChange={handleInputChange}
          >
            <option value="">Select Bathrooms</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value="3+">3+</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Bedrooms:</label>
          <select
            name="bedrooms"
            className="form-control"
            value={propertyData.bedrooms}
            onChange={handleInputChange}
          >
            <option value="">Select Bedrooms</option>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value="3+">3+</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Furnishing:</label>
          <select
            name="furnishing"
            className="form-control"
            value={propertyData.furnishing}
            onChange={handleInputChange}
          >
            <option value="">Select Furnishing</option>
            <option value="Furnished">Furnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Super Builtup Area (sq.ft):</label>
          <input
            type="number"
            name="superBuiltupArea"
            className="form-control"
            value={propertyData.superBuiltupArea}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Carpet Area (sq.ft) :</label>
          <input
            type="number"
            name="carpetArea"
            className="form-control"
            value={propertyData.carpetArea}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Maintenance Monthly:</label>
          <input
            type="number"
            name="maintenanceMonthly"
            className="form-control"
            value={propertyData.maintenanceMonthly}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Total Floors: </label>
          <input
            type="number"
            name="totalFloors"
            className="form-control"
            value={propertyData.totalFloors}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Floor No:</label>
          <input
            type="number"
            name="floorNo"
            className="form-control"
            value={propertyData.floorNo}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Car Parking:</label>
          <select
            name="carParking"
            className="form-control"
            value={propertyData.carParking}
            onChange={handleInputChange}
          >
            <option value="">Select Car Parking</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3+">3+</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Facing:</label>
          <select
            name="facing"
            className="form-control"
            value={propertyData.facing}
            onChange={handleInputChange}
          >
            <option value="">Select Facing</option>
            <option value="East">East</option>
            <option value="North">North</option>
            <option value="North-East">North-East</option>
            <option value="North-West">North-West</option>
            <option value="South">South</option>
            <option value="South-East">South-East</option>
            <option value="South-West">South-West</option>
            <option value="West">West</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Ad Title:</label>
          <input
            type="text"
            name="adTitle"
            className="form-control"
            value={propertyData.adTitle}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Description: </label>
          <textarea
            name="description"
            className="form-control"
            value={propertyData.description}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label>Price: </label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={propertyData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label>Image:</label>
          <input
            type="file"
            name="images"
            className="form-control"
            onChange={handleImageUpload}
          />
        </div>

        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            Add Property
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
