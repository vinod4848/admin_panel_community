import React, { useState, useEffect } from "react";
import { Table, message, Modal, Button, Select } from "antd";
import axios from "axios";
import { base_url } from "../utils/base_url";
import { AiFillDelete } from "react-icons/ai";
// import { BiEdit } from "react-icons/bi";
// import { Link } from "react-router-dom";

const { Option } = Select;

const SellAndbuyList = () => {
  const [products, setProducts] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [selectedProductType, setSelectedProductType] = useState("phones");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${base_url}/${selectedProductType}`);
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${selectedProductType}:`, error);
      }
    };

    fetchProducts();
  }, [selectedProductType]);

  const generateColumns = (schema) => {
    const genericColumns = [
      { title: "Post By", dataIndex: "firstName" },
      { title: "Ad Title", dataIndex: "adTitle" },
      { title: "Description", dataIndex: "description" },
      { title: "Address", dataIndex: "address" },
      { title: "Landmark", dataIndex: "landmark" },
      { title: "Price", dataIndex: "price" },
      { title: "Brand", dataIndex: "brand" },
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
                  alt={`Product ${record.key + 1}`}
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
            {/* <Link
              to={`/admin/${selectedProductType}/${record._id}`}
              className="fs-3 text-danger"
            >
              <Button type="text">
                <BiEdit />
              </Button>
            </Link> */}
          </div>
        ),
      },
    ];

    const specificColumns = schema.map((field) => ({
      title: field.title,
      dataIndex: field.dataIndex,
    }));

    return [...genericColumns, ...specificColumns];
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `${base_url}/${selectedProductType}/${productIdToDelete}`
      );

      if (response.status === 200) {
        message.success("Product deleted successfully");
        const updatedProducts = products.filter(
          (product) => product._id !== productIdToDelete
        );
        setProducts(updatedProducts);
        setDeleteModalVisible(false);
        setProductIdToDelete(null);
      } else {
        message.error("Failed to delete product");
      }
    } catch (error) {
      console.error(`Error deleting ${selectedProductType}:`, error);
      message.error("Failed to delete product");
    }
  };

  const showDeleteModal = (productId) => {
    setDeleteModalVisible(true);
    setProductIdToDelete(productId);
  };

  const hideDeleteModal = () => {
    setDeleteModalVisible(false);
    setProductIdToDelete(null);
  };

  const handleProductTypeChange = (value) => {
    setSelectedProductType(value);
  };

  const columns = generateColumns([]);
  const columnsOfCar = [
    { title: "Post By", dataIndex: "firstName" },
    { title: "Ad Title", dataIndex: "adTitle" },
    // { title: "Description", dataIndex: "description" },
    { title: "Address", dataIndex: "address" },
    // { title: "Landmark", dataIndex: "landmark" },
    { title: "Price", dataIndex: "price" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Year", dataIndex: "year" },
    { title: "Fuel Type", dataIndex: "fuelType" },
    // { title: "Transmission", dataIndex: "transmission" },
    { title: "KM Driven", dataIndex: "kmDriven" },
    { title: "No. Owners", dataIndex: "numberOfOwners" },
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
                alt={`Product ${record.key + 1}`}
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
          {/* <Link
            to={`/admin/${selectedProductType}/${record._id}`}
            className="fs-3 text-danger"
          >
            <Button type="text">
              <BiEdit />
            </Button>
          </Link> */}
        </div>
      ),
    },
  ];
  const columnsOfBike =([
  
    { title: "Post By", dataIndex: "firstName" },
    { title: "Ad Title", dataIndex: "adTitle" },
    // { title: "Description", dataIndex: "description" },
    { title: "Address", dataIndex: "address" },
    // { title: "Landmark", dataIndex: "landmark" },
    { title: "Price", dataIndex: "price" },
    { title: "Brand", dataIndex: "brand" },
    { title: "Year", dataIndex: "year" },
    { title: "KM Driven", dataIndex: "kmDriven" },
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
                alt={`Product ${record.key + 1}`}
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
          {/* <Link
            to={`/admin/${selectedProductType}/${record._id}`}
            className="fs-3 text-danger"
          >
            <Button type="text">
              <BiEdit />
            </Button>
          </Link> */}
        </div>
      ),
    },
  ]);

  const data = products.map((product, index) => ({
    key: index,
    ...product,
    firstName: product.profileId.firstName,
  }));

  return (
    <div>
      <h2>Products List</h2>
      <Select
        defaultValue="phones"
        style={{ width: 120 }}
        onChange={handleProductTypeChange}
      >
        <Option value="phones">Phones</Option>
        <Option value="accessories">Accessories</Option>
        <Option value="tablets">Tablets</Option>
        <Option value="bicycles">Bicycles</Option>
        <Option value="bikes">Bikes</Option>
        <Option value="cars">Cars</Option>
      </Select>
      <Table
        columns={
          selectedProductType === "cars"
            ? columnsOfCar
            : selectedProductType === "bikes"
            ? columnsOfBike
            : columns
        }
        dataSource={data}
        className="custom-table"
      />
      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={hideDeleteModal}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to delete this {selectedProductType}?</p>
      </Modal>
    </div>
  );
};

export default SellAndbuyList;
