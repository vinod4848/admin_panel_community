import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const AnnouncementList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

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

  const isFutureDate = (dateString) => {
    const currentDate = new Date();
    const announcementDate = new Date(dateString);
    return announcementDate > currentDate;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      <h2 style={{ color: "green" }}>Announcements List</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Approvedby</th>
            <th>Created By</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {announcements
            .filter(
              (announcement) =>
                announcement.isActive && isFutureDate(announcement.date)
            )
            .map((filteredAnnouncement) => (
              <tr key={filteredAnnouncement._id}>
                <td>{filteredAnnouncement.approvedby.username}</td>
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
                  <img
                    src={filteredAnnouncement.image}
                    alt="Announcement"
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleShowModal(filteredAnnouncement)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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

export default AnnouncementList;
