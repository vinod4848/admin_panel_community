import React, { useEffect, useState } from "react";
import { base_url } from "../utils/base_url";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";

const AnnouncementCategoryList = () => {
  const [announcementCategories, setAnnouncementCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  useEffect(() => {
    axios
      .get(`${base_url}/announcement-categories`)
      .then((response) => setAnnouncementCategories(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (announcementCategoryId) => {
    axios
      .delete(`${base_url}/announcement-categories/${announcementCategoryId}`)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Failed to delete announcement category");
        }
        setAnnouncementCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category._id !== announcementCategoryId
          )
        );
        handleCloseModal();
      })
      .catch((error) =>
        console.error("Error deleting announcement category:", error)
      );
  };

  const handleShowModal = (announcementCategory) => {
    setSelectedAnnouncement(announcementCategory);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAnnouncement(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2 style={{ color: "green" }}>Announcements Category List </h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {announcementCategories.map((filteredCategory) => (
            <tr key={filteredCategory._id}>
              <td>{filteredCategory.announcementCategoryName}</td>
              <td>{filteredCategory.date}</td>
              <td>
                <Button
                  className="ms-2 fs-2 text-danger bg-transparent border-0"
                  onClick={() => handleShowModal(filteredCategory)}
                >
                  <MdOutlineDelete />
                </Button>
                <Link
                  to={`/admin/announcementCategoryName/${filteredCategory._id}`}
                  className=" ms-2 fs-3 text-danger"
                >
                  <BiEdit />
                </Link>
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
          Are you sure you want to delete the announcement category?
          {selectedAnnouncement && (
            <p>
              Announcement Category:{" "}
              {selectedAnnouncement.announcementCategoryName}, Date:{" "}
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

export default AnnouncementCategoryList;
