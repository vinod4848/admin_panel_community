import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select, Space, Image  } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const PgGuestHouseList = () => {
  const [pgGuestHouses, setPgGuestHouses] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [pgGuestHousesToDelete, setPgGuestHousesToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchPgGuestHouses = async () => {
      try {
        const response = await axios.get(`${base_url}/pgGuestHouses`);
        setPgGuestHouses(response.data);
      } catch (error) {
        console.error("Error fetching pgGuestHouses:", error);
      }
    };

    fetchPgGuestHouses();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/pgGuestHouses/${pgGuestHousesToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        const updatedPgGuestHouses = pgGuestHouses.filter(
          (pgGuestHouse) => pgGuestHouse._id !== pgGuestHousesToDelete
        );
        setPgGuestHouses(updatedPgGuestHouses);
        setDeleteModalVisible(false);
        setPgGuestHousesToDelete(null);
      } else {
        message.error("Failed to delete pgGuestHouses");
      }
    } catch (error) {
      console.error("Error deleting pgGuestHouses:", error);
      message.error("Failed to delete pgGuestHouses");
    }
  };

  const showDeleteModal = (landPlotId) => {
    setDeleteModalVisible(true);
    setPgGuestHousesToDelete(landPlotId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setPgGuestHousesToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(
        `${base_url}/pgGuestHouses/${record._id}`,
        {
          isActive: !record.isActive,
          approvedby: getUserData?._id || "",
        }
      );
      if (response.status === 200) {
        message.success(
          `PG Guest House ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const updatedPgGuestHouses = pgGuestHouses.map((pgGuestHouse) =>
          pgGuestHouse._id === record._id
            ? { ...pgGuestHouse, isActive: !record.isActive }
            : pgGuestHouse
        );
        setPgGuestHouses(updatedPgGuestHouses);
      } else {
        message.error("Failed to toggle PG Guest House activation status");
      }
    } catch (error) {
      console.error("Error toggling PG Guest House activation status:", error);
      message.error("Failed to toggle PG Guest House activation status");
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
    // {
    //   title: "Property Type",
    //   dataIndex: "subtype",
    // },
    {
      title: "Title",
      dataIndex: "adTitle",
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
      title: "Price",
      dataIndex: "price",
    },
    // {
    //   title: "Furnishing",
    //   dataIndex: "furnishing",
    // },
    // {
    //   title: "Car Parking",
    //   dataIndex: "carParking",
    // },
    // {
    //   title: "Meals Included",
    //   dataIndex: "mealsIncluded",
    // },
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
          {/* <Link
            to={`/admin/pgGuestHouses/${record._id}`}
            className="fs-3 text-danger"
          >
            <Button type="text">
              <BiEdit />
            </Button>
          </Link> */}
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

  const filteredData = pgGuestHouses.filter((pgGuestHouse) => {
    const adTitleMatch = pgGuestHouse.adTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceMatch = pgGuestHouse.price
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const propertyTypeMatch = pgGuestHouse.subtype
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return adTitleMatch || priceMatch || propertyTypeMatch;
  });

  const data = filteredData
    .filter((pgGuestHouse) => {
      if (filterValue === "all") {
        return true;
      } else {
        return pgGuestHouse.isActive === (filterValue === "true");
      }
    })
    .map((pgGuestHouse, index) => ({
      key: index,
      ...pgGuestHouse,
      firstName: pgGuestHouse?.profileId?.firstName,
      amount: pgGuestHouse.payments[0]?.amount,
      image: pgGuestHouse.payments[0]?.image,
      approvedby: pgGuestHouse.approvedby
        ? pgGuestHouse.approvedby.username || "N/A"
        : "N/A",
    }));

  return (
    <div>
      <h2>PG & Guest Houses</h2>
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
      <Table columns={columns} dataSource={data} className="custom-table" />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this PG Guest House?</p>
      </Modal>
    </div>
  );
};

export default PgGuestHouseList;
