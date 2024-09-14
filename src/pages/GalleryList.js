import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Table, Image, Space, Button, Modal, message } from "antd";
import { AiFillDelete } from "react-icons/ai";

const GalleryList = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get(`${base_url}/gallery`);
        const data = response.data;
        setGalleryItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGalleryItems();
  }, []);

  const handleDelete = async () => {
    try {
      if (deleteRecord) {
        await axios.delete(`${base_url}/gallery/${deleteRecord._id}`);
        message.success("Gallery item deleted successfully");
        setGalleryItems((prevGalleryItems) =>
          prevGalleryItems.filter((item) => item._id !== deleteRecord._id)
        );
        setDeleteRecord(null);
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete gallery item");
      setDeleteRecord(null);
      setIsDeleteModalVisible(false);
    }
  };

  const showModal = (record) => {
    setDeleteRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setDeleteRecord(null);
    setIsDeleteModalVisible(false);
  };

  const columns = [
    { title: "Album Title", dataIndex: "Albumtitle" },
    {
      title: "Images",
      dataIndex: "image",
      render: (images) => (
        <Space size={[8, 8]} wrap>
          {images.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              alt={`Image ${index}`}
              style={{ width: "250px", height: "250px", marginBottom: "8px" }}
            />
          ))}
        </Space>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <>
          <Button
            type="danger"
            onClick={() => showModal(record)}
            icon={<AiFillDelete style={{ color: "#da3838" }} />}
          />
          <Modal
            title="Confirm Delete"
            visible={isDeleteModalVisible}
            onOk={handleDelete}
            onCancel={handleCancel}
            okText="Yes"
            cancelText="No"
          >
            <p>Are you sure you want to delete this gallery item?</p>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div>
      <h4>Gallery</h4>
      <Table dataSource={galleryItems} columns={columns} />
    </div>
  );
};

export default GalleryList;
