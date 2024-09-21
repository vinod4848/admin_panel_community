import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { Config } from "../utils/axiosconfig";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const PhoneList = () => {
  const [phones, setPhone] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [phoneToDelete, setPhoneToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`${base_url}/phones`);
        setPhone(response.data);
      } catch (error) {
        console.error("Error fetching phones:", error);
      }
    };

    fetchPhone();
  }, []);

  const handleDelete = async () => {
    if (!phoneToDelete) return;

    try {
      const response = await axios.delete(
        `${base_url}/phones/${phoneToDelete._id}`
      );
      if (response.status === 200) {
        message.success("Phone deleted successfully");
        const updatedPhones = phones.filter((item) => item._id !== phoneToDelete._id);
        setPhone(updatedPhones);
        setDeleteModalVisible(false);
        setPhoneToDelete(null);
      } else {
        message.error("Failed to delete phone");
      }
    } catch (error) {
      console.error("Error deleting phone:", error);
      message.error("Failed to delete phone");
    }
  };

  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setPhoneToDelete(record);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPhoneToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleActive = async (phoneId, isActive) => {
    try {
      const response = await axios.put(
        `${base_url}/approvePhone/${phoneId._id}`,
        {
          isActive: !isActive,
          approvedby: getUserData?._id || "",
        },
        Config
      );
      if (response.status === 200) {
        message.success(`Phone ${isActive ? "deactivated" : "activated"} successfully`);
        const updatedPhones = phones.map((item) =>
          item._id === phoneId ? { ...item, isActive: !isActive } : item
        );
        setPhone(updatedPhones);
      } else {
        message.error("Failed to toggle phone activation status");
      }
    } catch (error) {
      console.error("Error toggling phone activation status:", error);
      message.error("Failed to toggle phone activation status");
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
      title: "Title",
      dataIndex: "adTitle",
    },
    {
      title: "Brand",
      dataIndex: "brand",
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
          {images && (
            <Image
              src={images}
              alt="Phone Image"
              style={{ width: "40px", height: "40px", marginBottom: "8px" }}
            />
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
          danger
          icon={<AiFillDelete style={{ color: "#da3838" }} />}
        />
      ),
    },
  ];

  const filteredData = phones.filter((item) => {
    const adTitleMatch = item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const priceMatch = item.price.toString().toLowerCase().includes(searchQuery.toLowerCase());
    const propertyTypeMatch = item.adTitle.toLowerCase().includes(searchQuery.toLowerCase());
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
    .map((item) => ({
      key: item._id,  // Use a unique key
      ...item,
      firstName: item?.profileId?.firstName,
      amount: item.payments[0]?.amount,
      image: item.payments[0]?.image,
      approvedby: item.approvedby ? item.approvedby.username || "N/A" : "N/A",
    }));

  return (
    <div>
      <h2>Phone List</h2>
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <RiSearchLine />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Ad Title, Price, or Brand"
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
        <p>Are you sure you want to delete this phone item?</p>
      </Modal>
    </div>
  );
};

export default PhoneList;
