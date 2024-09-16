import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { Modal, Button, Space, Image } from "antd";
import axios from "axios";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    axios
      .get(`${base_url}/announcements`)
      .then((response) => {
        if (Array.isArray(response?.data?.data)) {
          setAnnouncements(response?.data?.data);
        } else {
          console.error("Unexpected data format:", response.data);
          setAnnouncements([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setAnnouncements([]);
      });
  }, []);

  const handleDelete = (announcementId) => {
    axios
      .delete(`${base_url}/announcements/${announcementId}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to delete announcement");
        }
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.filter(
            (announcement) => announcement._id !== announcementId
          )
        );
        handleCloseModal();
      })
      .catch((error) => console.error("Error deleting announcement:", error));
  };

  const handleShowModal = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  const isFutureDate = (dateString) => {
    const currentDate = new Date();
    const announcementDate = new Date(dateString);
    return announcementDate > currentDate;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div>
      <h2 style={{ color: "green" }}>Announcements List</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }} className="custom-table">
        <thead>
          <tr>
            <th>Approved By</th>
            <th>Created By</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Image</th>
            <th>Activation Amount</th>
            <th>Payment Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(announcements) ? announcements : [])
            .filter(
              (announcement) =>
                announcement.isActive && isFutureDate(announcement.date)
            )
            .map((filteredAnnouncement) => (
              <tr key={filteredAnnouncement._id}>
                <td>{filteredAnnouncement.approvedby?.username}</td>
                <td>
                  {filteredAnnouncement.createdBy
                    ? filteredAnnouncement.createdBy.username
                    : filteredAnnouncement.profileId
                    ? filteredAnnouncement.profileId.firstName
                    : "Not Available"}
                </td>

                <td>{filteredAnnouncement.announcementType}</td>
                <td>{filteredAnnouncement.description}</td>
                <td>{formatDate(filteredAnnouncement.date)}</td>
                <td>
                  <img
                    src={filteredAnnouncement.image}
                    alt="Announcement"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>{filteredAnnouncement.payments?.amount || "N/A"}</td>
                <td>
                  <Space size={[8, 8]} wrap>
                    {filteredAnnouncement.payments?.image ? (
                      <Image
                        src={filteredAnnouncement.payments?.image}
                        alt="Payment"
                        style={{
                          width: "70px",
                          height: "70px",
                          marginBottom: "8px",
                        }}
                      />
                    ) : (
                      <span>N/A</span>
                    )}
                  </Space>
                </td>
                <td>
                  <Button
                    type="danger"
                    onClick={() => handleShowModal(filteredAnnouncement)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        title="Confirm Deletion"
        visible={showModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="cancel" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="danger"
            onClick={() => handleDelete(selectedAnnouncement?._id)}
          >
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete the announcement?
          {selectedAnnouncement && (
            <span>
              Announcement Type: {selectedAnnouncement.announcementType}, Date:{" "}
              {formatDate(selectedAnnouncement.date)}
            </span>
          )}
        </p>
      </Modal>
    </div>
  );
};

export default AnnouncementList;
