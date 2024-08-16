import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const OtherList = () => {
  const [other, setOther] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [fashionToDelete, setOtherToDelete] = useState(null);
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
      const response = await axios.delete(
        `${base_url}/other/${fashionToDelete._id}`
      );
      if (response.status === 200) {
        message.success("other deleted successfully");
        const updatedOther = other.filter(
          (item) => item._id !== fashionToDelete._id
        );
        setOther(updatedOther);
        setDeleteModalVisible(false);
        setOtherToDelete(null);
      } else {
        message.error("Failed to delete other");
      }
    } catch (error) {
      console.error("Error deleting other:", error);
      message.error("Failed to delete other");
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

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(`${base_url}/other/${record._id}`, {
        isActive: !record.isActive,
        approvedby: getUserData?._id || "",
      });
      if (response.status === 200) {
        message.success(
          `other ${record.isActive ? "deactivated" : "activated"} successfully`
        );
        const updatedOther = other.map((item) =>
          item._id === record._id
            ? { ...item, isActive: !record.isActive }
            : item
        );
        setOther(updatedOther);
      } else {
        message.error("Failed to toggle other activation status");
      }
    } catch (error) {
      console.error("Error toggling other activation status:", error);
      message.error("Failed to toggle other activation status");
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
      title: "Price",
      dataIndex: "price",
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
      title: "Activation Amount",
      dataIndex: "amount",
    },

    {
      title: "Payment Image",
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
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <>
          <Button
            type="danger"
            onClick={() => showDeleteModal(record)}
            icon={<AiFillDelete style={{ color: "#da3838" }} />}
          />
        </>
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
          placeholder="Search by Ad Title, Price, or OtherType"
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
        <p>Are you sure you want to delete this other item?</p>
      </Modal>
    </div>
  );
};

export default OtherList;
