import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { Modal, Button } from "react-bootstrap";

const MagazinesList = () => {
  const [magazines, setMagazines] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteMagazineId, setDeleteMagazineId] = useState(null);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const response = await axios.get(`${base_url}/magazines`);
        setMagazines(response.data);
      } catch (error) {
        console.error("Error fetching magazines:", error);
      }
    };

    fetchMagazines();
  }, []);

  const downloadPdf = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  };

  const handleDelete = (id) => {
    setDeleteMagazineId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${base_url}/magazines/${deleteMagazineId}`);

      setMagazines((prevMagazines) =>
        prevMagazines.filter((magazine) => magazine._id !== deleteMagazineId)
      );
    } catch (error) {
      console.error("Error deleting magazine:", error);
    } finally {
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className="container mt-5">
      <h1>Magazines List</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {magazines.map((magazine) => (
          <li key={magazine._id}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: "1" }}>
                <h2>{magazine.title}</h2>
                <p>Date: {magazine.date}</p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <button
                  className="btn btn-primary mr-2"
                  style={{ marginRight: "7px" }}
                  onClick={() => downloadPdf(magazine.image)}
                >
                  Download
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(magazine._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
          </li>
        ))}
      </ul>
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Magazine</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this magazine?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MagazinesList;
