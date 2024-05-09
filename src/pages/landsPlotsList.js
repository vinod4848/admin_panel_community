import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

const { Option } = Select;

const LandsPlotsList = () => {
  const [landPlots, setLandPlots] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [landPlotsToDelete, setLandPlotsToDelete] = useState(null);
  const [filterValue, setFilterValue] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchLandPlots = async () => {
      try {
        const response = await axios.get(`${base_url}/landPlots`);
        setLandPlots(response.data);
      } catch (error) {
        console.error("Error fetching landPlots:", error);
      }
    };

    fetchLandPlots();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/landPlots/${landPlotsToDelete}`
      );
      if (response.status === 200) {
        message.success("Land plot deleted successfully");
        const updatedLandPlots = landPlots.filter(
          (landPlot) => landPlot._id !== landPlotsToDelete
        );
        setLandPlots(updatedLandPlots);
        setDeleteModalVisible(false);
        setLandPlotsToDelete(null);
      } else {
        message.error("Failed to delete land & Plots");
      }
    } catch (error) {
      console.error("Error deleting landPlots:", error);
      message.error("Failed to delete landPlots");
    }
  };

  const showDeleteModal = (landPlotId) => {
    setDeleteModalVisible(true);
    setLandPlotsToDelete(landPlotId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setLandPlotsToDelete(null);
  };

  const handleFilterChange = (value) => {
    setFilterValue(value);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleActive = async (record) => {
    try {
      const response = await axios.put(`${base_url}/landPlots/${record._id}`, {
        isActive: !record.isActive,
        approvedby: getUserData?._id || "",
      });
      if (response.status === 200) {
        message.success(
          `Land & Plots ${
            record.isActive ? "deactivated" : "activated"
          } successfully`
        );
        const updatedLandPlots = landPlots.map((landPlot) =>
          landPlot._id === record._id
            ? { ...landPlot, isActive: !record.isActive }
            : landPlot
        );
        setLandPlots(updatedLandPlots);
      } else {
        message.error("Failed to toggle Land & Plots activation status");
      }
    } catch (error) {
      console.error("Error toggling Land & Plots activation status:", error);
      message.error("Failed to toggle Land & Plots activation status");
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
      title: "Property Type",
      dataIndex: "type",
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

  const filteredData = landPlots.filter((landPlot) => {
    const adTitleMatch = landPlot.adTitle
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const priceMatch = landPlot.price
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const propertyTypeMatch = landPlot.type
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return adTitleMatch || priceMatch || propertyTypeMatch;
  });
//usdhxch
  const data = filteredData
    .filter((landPlot) => {
      if (filterValue === "all") {
        return true;
      } else {
        return landPlot.isActive === (filterValue === "true");
      }
    })
    .map((landPlot, index) => ({
      key: index,
      ...landPlot,
      firstName: landPlot.profileId.firstName,
      approvedby: landPlot.approvedby
        ? landPlot.approvedby.username || "N/A"
        : "N/A",
    }));

  return (
    <div>
      <h2>Land & Plots</h2>
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
        <p>Are you sure you want to delete this Land & Plots?</p>
      </Modal>
    </div>
  );
};

export default LandsPlotsList;
