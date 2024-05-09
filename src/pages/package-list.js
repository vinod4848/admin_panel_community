import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import "./PackageList.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const PackageList = () => {
  const [packageList, setPackageList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const response = await axios.get(`${base_url}/packages`);
        setPackageList(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package data:", error);
        setLoading(false);
      }
    };

    fetchPackageData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this package!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${base_url}/packages/${id}`);
        setPackageList((prevList) => prevList.filter((pkg) => pkg._id !== id));
        Swal.fire("Deleted!", "The package has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting package:", error);
        Swal.fire("Error!", "Failed to delete the package.", "error");
      }
    }
  };

  return (
    <div className="package-list-container">
      <h1 className="page-title">Package List</h1>
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : packageList.length === 0 ? (
        <p className="no-packages-text">No packages found</p>
      ) : (
        <table className="package-table">
          <thead>
            <tr>
              <th>Package Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Package For</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {packageList.map((pkg) => (
              <tr key={pkg._id}>
                <td>{pkg.packagename}</td>
                <td>{pkg.description}</td>
                <td>{pkg.price}</td>
                <td>{pkg.packagefor}</td>
                <td className="action-cell">
                  <button
                    onClick={() => handleDelete(pkg._id)}
                    className="delete-btn"
                  >
                    <MdOutlineDelete />
                  </button>
                  <Link to={`/admin/package/${pkg._id}`} className="delete-btn">
                    <BiEdit />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PackageList;
