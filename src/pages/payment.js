import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_url } from "../utils/base_url";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const PaymentListofline = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [newAmount, setNewAmount] = useState("");
  const [newImage, setNewImage] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${base_url}/paymentslisting`);
      setPayments(response.data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleEditClick = (payment) => {
    setCurrentPayment(payment);
    setNewAmount(payment.amount);
    setNewImage(payment.image);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      setUploading(true);

      let updatedPayment = {
        ...currentPayment,
        amount: newAmount,
      };

      if (newImage instanceof File) {
        const formData = new FormData();
        formData.append("image", newImage);
        const uploadResponse = await axios.put(
          `${base_url}/paymentslisting/${currentPayment._id}`,
          formData
        );
        updatedPayment.image = uploadResponse.data.imageUrl;
      }

      await axios.put(
        `${base_url}/paymentslisting/${currentPayment._id}`,
        updatedPayment
      );

      setPayments(
        payments.map((payment) =>
          payment._id === currentPayment._id ? updatedPayment : payment
        )
      );

      setShowModal(false);
      fetchPayments();
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">Error: {error}</Alert>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Payments</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Payment for</th>
            <th>Amount</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.productModel}</td>
              <td>₹{payment.amount}</td>
              <td>
                <img
                  src={payment.image}
                  alt="Payment"
                  className="img-thumbnail"
                  width="50"
                  height="50"
                />
              </td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditClick(payment)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {currentPayment && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formImage" className="mt-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formFile" className="mt-3">
                <Form.Label>Upload New Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setNewImage(e.target.files[0])}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              {uploading ? "Saving..." : "Save Changes"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default PaymentListofline;
