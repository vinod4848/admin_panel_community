import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { base_url } from "../utils/base_url";

const AddPackage = () => {
  const navigate = useNavigate();
  const { packagesId } = useParams();

  const [packageData, setPackageData] = useState({
    packagename: "",
    description: "",
    price: "",
    packagefor: "",
  });

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/packages/${packagesId}`);
        const { packagename, description, price, packagefor } = response.data;
        setPackageData({ packagename, description, price, packagefor });
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    if (packagesId) {
      fetchPackageDetails();
    }
  }, [packagesId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (packagesId) {
        await axios.put(`${base_url}/packages/${packagesId}`, packageData);
        toast.success("Package updated successfully!");
      } else {
        await axios.post(`${base_url}/packages`, packageData);
        toast.success("Package added successfully!");
      }
      navigate("/admin/package-list");
    } catch (error) {
      console.error("Error adding/updating package:", error);
      toast.error("Error adding/updating package. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h4>{packagesId ? "Update Package" : "Add Package"}</h4>
      <form onSubmit={handleSubmit}>
        {Object.entries(packageData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
            <input
              type={key === "price" || key === "packagefor" ? "number" : "text"}
              name={key}
              className="form-control"
              value={value}
              onChange={handleChange}
            />
          </div>
        ))}
        <div className="mb-3">
          <button type="submit" className="btn btn-success form-control">
            {packagesId ? "Update Package" : "Add Package"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPackage;
