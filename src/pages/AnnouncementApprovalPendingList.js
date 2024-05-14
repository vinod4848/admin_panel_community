import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { Modal, Button, Table, Image } from "react-bootstrap";
import { Space } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";

const AnnouncementApprovalPendingList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const getUserData = useSelector((state) => state.auth.user);

  useEffect(() => {
    axios
      .get(`${base_url}/announcements`)
      .then((response) => setAnnouncements(response.data))
      .catch((error) => console.error("Error fetching data:", error));
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleActivate = (announcementId) => {
    axios
      .put(`${base_url}/updateAnnouncementStatus/${announcementId}`, {
        isActive: true,
        approvedby: getUserData?._id || "", // Update approvedby with user data
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to activate announcement");
        }
        // Update the local state with the updated isActive status
        setAnnouncements((prevAnnouncements) =>
          prevAnnouncements.map((announcement) =>
            announcement._id === announcementId
              ? { ...announcement, isActive: true }
              : announcement
          )
        );
        handleCloseModal();
      })
      .catch((error) => console.error("Error activating announcement:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Announcements Approval Pending List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>CreatedBy</th>
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
          {announcements
            .filter((announcement) => !announcement.isActive)
            .map((filteredAnnouncement) => (
              <tr key={filteredAnnouncement._id}>
                <td>
                  {filteredAnnouncement.createdBy
                    ? filteredAnnouncement.createdBy.username || "Not Available"
                    : filteredAnnouncement.profileId?.firstName ||
                      "Not Available"}
                </td>
                <td>{filteredAnnouncement.announcementType}</td>
                <td>{filteredAnnouncement.description}</td>
                <td>{formatDate(filteredAnnouncement.date)}</td>
                <td>
                  <Image
                    src={filteredAnnouncement.image}
                    alt="Announcement"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                    thumbnail
                  />
                </td>
                <td>{filteredAnnouncement.payments[0]?.amount || "N/A"}</td>
                <td>
                  <Space size={[8, 8]} wrap>
                    {filteredAnnouncement.payments[0]?.image ? (
                      <Image
                        src={filteredAnnouncement.payments[0]?.image}
                        alt="Payment"
                        style={{ width: "70px", height: "70px", marginBottom: "8px" }}
                      />
                    ) : (
                      <span>N/A</span>
                    )}
                  </Space>
                </td>
                <td>
                  <Button
                    variant="danger"
                    style={{ width: "83px", marginLeft: "5px" }}
                    onClick={() => handleShowModal(filteredAnnouncement)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    style={{ marginLeft: "5px", marginTop: "5px" }}
                    onClick={() => handleActivate(filteredAnnouncement._id)}
                  >
                    Activate
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the announcement?
          {selectedAnnouncement && (
            <p>
              Announcement Type: {selectedAnnouncement.announcementType}, Date:{" "}
              {selectedAnnouncement.date}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(selectedAnnouncement?._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AnnouncementApprovalPendingList;
