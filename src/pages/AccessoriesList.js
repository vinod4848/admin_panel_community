import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { Config } from "../utils/axiosconfig";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";
const { Option } = Select;

const AccessoriesList = () => {
  const [accessories, setAccessories] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [PhoneToDelete, setAccessoriesToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const response = await axios.get(`${base_url}/accessories`);
        setAccessories(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchPhone();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/accessories/${PhoneToDelete._id}`
      );
      if (response.status === 200) {
        message.success("Accessories deleted successfully");
        const upadtePhone = accessories.filter(
          (item) => item._id !== PhoneToDelete._id
        );
        setAccessories(upadtePhone);
        setDeleteModalVisible(false);
        setAccessoriesToDelete(null);
      } else {
        message.error("Failed to delete accessories");
      }
    } catch (error) {
      console.error("Error deleting accessories:", error);
      message.error("Failed to delete accessories");
    }
  };

  const showDeleteModal = (record) => {
    setDeleteModalVisible(true);
    setAccessoriesToDelete(record);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setAccessoriesToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleActive = async (accessoriesId, isActive) => {
    try {
      const response = await axios.put(
        `${base_url}/approveAccessories/${accessoriesId._id}`,
        {
          isActive: !isActive,
          approvedby: getUserData?._id || "",
        },
        Config
      );
      if (response.status === 200) {
        message.success(`Accessories ${isActive ? "deactivated" : "activated"} successfully`);
        const updateAccessories = accessories.map((item) =>
          item._id === accessoriesId ? { ...item, isActive: !isActive } : item
        );
        setAccessories(updateAccessories);
      } else {
        message.error("Failed to toggle accessories activation status");
      }
    } catch (error) {
      console.error("Error toggling accessories activation status:", error);
      message.error("Failed to toggle accessories activation status");
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
    // {
    //   title: "Type",
    //   dataIndex: "type",
    // },
    {
      title: "Price",
      dataIndex: "price",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    // },
    {
      title: "Address",
      dataIndex: "address",
    },
    // {
    //   title: "Landmark",
    //   dataIndex: "landmark",
    // },
    {
      title: "Images",
      dataIndex: "images",
      render: (images) => (
        <Space size={[8, 8]} wrap>
          {images && (
            <Image
              src={images}
              alt="Accessory Image"
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
        <Button type="primary" onClick={() => handleToggleActive(record)}>
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
  const filteredData = accessories.filter((item) => {
    const adTitleMatch = item.type
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceMatch = item.price
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const propertyTypeMatch = item.adTitle
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
      <h2>Accessories List</h2>
      <div className="mb-3 input-group">
        <span className="input-group-text">
          <RiSearchLine />
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="Search by Ad Title, Price, or accessories"
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
      <Table columns={columns} dataSource={data}  className="custom-table"/>
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this accessories item?</p>
      </Modal>
    </div>
  );
};

export default AccessoriesList;
