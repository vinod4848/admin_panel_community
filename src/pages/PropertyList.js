import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const LandsPlotsList = () => {
  const [properties, setProperties] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [propertiesToDelete, setPropertiesToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const response = await axios.get(`${base_url}/properties`);
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchLandPlots();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/properties/${propertiesToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        const updatedLandPlots = properties.filter(
          (property) => property._id !== propertiesToDelete
        );
        setProperties(updatedLandPlots);
        setDeleteModalVisible(false);
        setPropertiesToDelete(null);
      } else {
        message.error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      message.error("Failed to delete property");
    }
  };

  const showDeleteModal = (propertyId) => {
    setDeleteModalVisible(true);
    setPropertiesToDelete(propertyId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPropertiesToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(`${base_url}/properties/${record._id}`, {
        isActive: !record.isActive,
        approvedby: getUserData?._id || "",
      });
      if (response.status === 200) {
        message.success(
          `Land & Plots ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const updatedLandPlots = properties.map((property) =>
          property._id === record._id
            ? { ...property, isActive: !record.isActive }
            : property
        );
        setProperties(updatedLandPlots);
      } else {
        message.error("Failed to toggle property activation status");
      }
    } catch (error) {
      console.error("Error toggling property activation status:", error);
      message.error("Failed to toggle property activation status");
    }
  };

  const columns = [
    {
      title: "SN",
      dataIndex: "",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Approved By",
      dataIndex: "approvedby",
    },
    {
      title: "Post By",
      dataIndex: "firstName",
    },
    {
      title: "Ad Title",
      dataIndex: "adTitle",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Facing",
      dataIndex: "facing",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Property Type",
      dataIndex: "propertyType",
    },
    {
      title: "Furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Builtup Area (sq.ft)",
      dataIndex: "superBuiltupArea",
    },
    {
      title: "Carpet Area (sq.ft)",
      dataIndex: "carpetArea",
    },
    {
      title: "Bathrooms",
      dataIndex: "bathrooms",
    },
    {
      title: "Maintenance Monthly",
      dataIndex: "maintenanceMonthly",
    },
    {
      title: "Total Floors",
      dataIndex: "totalFloors",
    },
    {
      title: "Floor No",
      dataIndex: "floorNo",
    },
    {
      title: "Car Parking",
      dataIndex: "carParking",
    },

    {
      title: "Images",
      dataIndex: "image",
      render: (image, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.isArray(image) ? (
            image.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Property ${record.key + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                }}
              />
            ))
          ) : (
            <p>No image available</p>
          )}
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <Button
            onClick={() => showDeleteModal(record._id)}
            type="text"
            danger
          >
            <AiFillDelete />
          </Button>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Button type="primary" onClick={() => handleToggleActive(record)}>
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
  ];

  const filteredData = properties.filter((property) => {
    const adTitleMatch = property.adTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch = property.price.toString().toLowerCase().includes(searchQuery.toLowerCase());
    const propertyTypeMatch = property.propertyType.toLowerCase().includes(searchQuery.toLowerCase());
    return adTitleMatch || priceMatch || propertyTypeMatch;
  });

  const data = filteredData
    .filter((property) => {
      if (filterValue === "all") {
        return true;
      } else {
        return property.isActive === (filterValue === "true");
      }
    })
    .map((property, index) => ({
      key: index,
      ...property,
      firstName: property.profileId.firstName,
      approvedby: property.approvedby ? property.approvedby.username || "N/A" : "N/A",
    }));

    return (
      <div>
        <h2>Properties</h2>
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <RiSearchLine />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by Ad Title, Price, or Property Type"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <Select
          defaultValue="all"
          style={{ width: 120, marginBottom: 16 }}
          onChange={handleFilterChange}
        >
          <Option value="all">Show All</Option>
          <Option value="true">Show Active</Option>
          <Option value="false">Show Inactive</Option>
        </Select>
        <Table columns={columns} dataSource={data} />
        <Modal
          title="Confirm Delete"
          visible={deleteModalVisible}
          onOk={handleDelete}
          onCancel={hideDeleteModal}
          okText="Yes"
          cancelText="No"
        >
          <p>Are you sure you want to delete this Property?</p>
        </Modal>
      </div>
    );
}
    export default LandsPlotsList;