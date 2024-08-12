import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Table, Button, Modal, message } from "antd";
import { AiFillDelete } from "react-icons/ai";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [deleteRecord, setDeleteRecord] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${base_url}/members`);
        const data = response.data;
        setMembers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMembers();
  }, []);

  const handleDelete = async () => {
    try {
      if (deleteRecord) {
        await axios.delete(`${base_url}/members/${deleteRecord._id}`);
        message.success("Member deleted successfully");
        setMembers((prevMembers) =>
          prevMembers.filter((member) => member._id !== deleteRecord._id)
        );
        setDeleteRecord(null);
        setIsDeleteModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to delete member");
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
    {
      title: "Index",
      render: (_, __, index) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Membership ID", dataIndex: "membershipId" },
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
            <p>Are you sure you want to delete this member?</p>
          </Modal>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Member List</h1>
      <Table dataSource={members} columns={columns} />
    </div>
  );
};

export default MemberList;
