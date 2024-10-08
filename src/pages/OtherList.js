import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { Config } from "../utils/axiosconfig";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const OtherList = () => {
  const [other, setOther] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [otherToDelete, setOtherToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");

  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchOther = async () => {
      try {
        const response = await axios.get(`${base_url}/other`);
        setOther(response.data);
      } catch (error) {
        console.error("Error fetching other:", error);
      }
    };

    fetchOther();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`${base_url}/other/${otherToDelete._id}`);
      if (response.status === 200) {
        message.success("Other item deleted successfully");
        const updatedOther = other.filter((item) => item._id !== otherToDelete._id);
        setOther(updatedOther);
        setDeleteModalVisible(false);
        setOtherToDelete(null);
      } else {
        message.error("Failed to delete other item");
      }
    } catch (error) {
      console.error("Error deleting other item:", error);
      message.error("Failed to delete other item");
    }
  };

  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setOtherToDelete(record);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setOtherToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleActive = async (otherId, isActive) => {
    try {
      const response = await axios.put(
        `${base_url}/approveOthers/${otherId}`,
        {
          isActive: !isActive,
          approvedby: getUserData?._id || "",
        },
        Config
      );
      if (response.status === 200) {
        message.success(`Other item ${isActive ? "deactivated" : "activated"} successfully`);
        const updatedOther = other.map((item) =>
          item._id === otherId ? { ...item, isActive: !isActive } : item
        );
        setOther(updatedOther);
      } else {
        message.error("Failed to toggle other item activation status");
      }
    } catch (error) {
      console.error("Error toggling other item activation status:", error);
      message.error("Failed to toggle other item activation status");
    }
  };

  const columns = [
    {
      title: "SN",
      dataIndex: "",
      render: (_, record, index) => index + 1,
    },
    {
      title: "Approved",
      dataIndex: "approvedby",
    },
    {
      title: "Post",
      dataIndex: "firstName",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Images",
      dataIndex: "images",
      render: (images) => (
        <Space size={[8, 8]} wrap>
          {images && images.length > 0 ? (
            images.map((imageUrl, index) => (
              <Image
                key={index}
                src={imageUrl}
                alt={`Image ${index}`}
                style={{ width: "40px", height: "40px", marginBottom: "8px" }}
              />
            ))
          ) : (
            <span>No images</span>
          )}
        </Space>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Image",
      dataIndex: "image",
      render: (image) => (
        <Space size={[8, 8]} wrap>
          {image ? (
            <Image
              src={image}
              alt="Image"
              style={{ width: "70px", height: "70px", marginBottom: "8px" }}
            />
          ) : (
            <span>N/A</span>
          )}
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (isActive, record) => (
        <Button type="primary" onClick={() => handleToggleActive(record._id, isActive)}>
          {isActive ? "Deactivate" : "Activate"}
        </Button>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <Button
          type="danger"
          onClick={() => showDeleteModal(record)}
          icon={<AiFillDelete style={{ color: "#da3838" }} />}
        />
      ),
    },
  ];

  const filteredData = other.filter((item) => {
    const adTitleMatch = item.adTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceMatch = item.price
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const propertyTypeMatch = item.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return adTitleMatch || priceMatch || propertyTypeMatch;
  });

  const data = filteredData
    .filter((item) => {
      if (filterValue === "all") {
        return true;
      } else {
        return item.isActive === (filterValue === "true");
      }
    })
    .map((item, index) => ({
      key: index,
      ...item,
      firstName: item?.profileId?.firstName,
      amount: item.payments[0]?.amount,
      image: item.payments[0]?.image,
      approvedby: item.approvedby ? item.approvedby.username || "N/A" : "N/A",
    }));

  return (
    <div>
      <h2>Others List</h2>
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <RiSearchLine />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Ad Title, Price, or Other Type"
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
      <Table columns={columns} dataSource={data} className="custom-table" />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this other item?</p>
      </Modal>
    </div>
  );
};

export default OtherList;
