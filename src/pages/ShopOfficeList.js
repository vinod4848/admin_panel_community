import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const ShopOfficeList = () => {
  const [shopOffices, setShopOffices] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [shopOfficeToDelete, setShopOfficeToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchShopOffices = async () => {
      try {
        const response = await axios.get(`${base_url}/shopOffices`);
        setShopOffices(response.data);
      } catch (error) {
        console.error("Error fetching shopOffices:", error);
      }
    };

    fetchShopOffices();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/shopOffices/${shopOfficeToDelete}`
      );
      if (response.status === 200) {
        message.success("Shop/Office deleted successfully");
        const updatedShopOffices = shopOffices.filter(
          (office) => office._id !== shopOfficeToDelete
        );
        setShopOffices(updatedShopOffices);
        setDeleteModalVisible(false);
        setShopOfficeToDelete(null);
      } else {
        message.error("Failed to delete Shop/Office");
      }
    } catch (error) {
      console.error("Error deleting Shop/Office:", error);
      message.error("Failed to delete Shop/Office");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(String(e.target.value));
  };
  

  const showDeleteModal = (officeId) => {
    setDeleteModalVisible(true);
    setShopOfficeToDelete(officeId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setShopOfficeToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(
        `${base_url}/shopOffices/${record._id}`,
        {
          isActive: !record.isActive,
          approvedby: getUserData ? getUserData._id || "" : "",
        }
      );
      if (response.status === 200) {
        message.success(
          `Shop/Office ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const updatedShopOffices = shopOffices.map((office) =>
          office._id === record._id
            ? { ...office, isActive: !record.isActive }
            : office
        );
        setShopOffices(updatedShopOffices);
      } else {
        message.error("Failed to toggle Shop/Office activation status");
      }
    } catch (error) {
      console.error("Error toggling Shop/Office activation status:", error);
      message.error("Failed to toggle Shop/Office activation status");
    }
  };

  const filteredShopOffices = shopOffices.filter((office) => {
    const adTitleMatch = office.adTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceMatch = office.price
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const propertyTypeMatch = office.shopOfficeType
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return adTitleMatch || priceMatch || propertyTypeMatch;
  });

  const data = filteredShopOffices
    .filter((office) => {
      if (filterValue === "all") {
        return true;
      } else {
        return office.isActive === (filterValue === "true");
      }
    })
    .map((office, index) => ({
      key: index,
      ...office,
      firstName: office.profileId.firstName,
      approvedby: office.approvedby
        ? office.approvedby.username || "N/A"
        : "N/A",
    }));

  const columns = [
    {
      title: "SN",
      dataIndex: "",
      render: (_, __, index) => index + 1,
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Landmark",
      dataIndex: "landmark",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Property type",
      dataIndex: "shopOfficeType",
    },
    {
      title: "carpetArea",
      dataIndex: "carpetArea",
    },
    {
      title: "maintenance",
      dataIndex: "maintenance",
    },
    {
      title: "carParking",
      dataIndex: "carParking",
    },
    {
      title: "washrooms",
      dataIndex: "washrooms",
    },
    {
      title: "furnishing",
      dataIndex: "furnishing",
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (images, record) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {Array.isArray(images) ? (
            images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Property ${record.key + 1}`}
                style={{
                  width: "100px",
                  height: "100px",
                  margin: "5px",
                }}
              />
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
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
  return (
    <div>
      <h2>Shops & Office</h2>
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
        <p>Are you sure you want to delete this Shops & Office?</p>
      </Modal>
    </div>
  );
};

export default ShopOfficeList;
