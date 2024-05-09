import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

const CompleteAnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    axios
      .get(`${base_url}/announcements`)
      .then((response) => {
        const currentDate = new Date();
        const filteredAnnouncements = response.data.filter((announcement) => {
          // Check if the announcement date is completed
          const announcementDate = new Date(announcement.date);
          return announcementDate < currentDate;
        });

        setAnnouncements(filteredAnnouncements);
      })
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

  return (
    <div>
      <h2 style={{ color: "red" }}>Complete Announcements List</h2>
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
          {announcements.map((announcement) => (
            <tr key={announcement._id}>
              
              <td>{announcement.approvedby?.username}</td>
              <td>
                  {announcement.createdBy
                    ? announcement.createdBy.username || "Not Available"
                    : announcement.profileId?.firstName ||
                      "Not Available"}
                </td>
                <td>{announcement.announcementType}</td>
              <td>{announcement.description}</td>
              <td>{announcement.date}</td>
              <td>
                <img
                  src={announcement.image}
                  alt="Announcement"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleShowModal(announcement)}
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
              Category: {selectedAnnouncement.announcementType}, Date:{" "}
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

export default CompleteAnnouncementsList;
