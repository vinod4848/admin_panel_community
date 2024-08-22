import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message, Modal, Input, Form } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { base_url } from "../utils/base_url";

const MemberProfilelist = () => {
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${base_url}/memberProfiles`);
        setMembers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMembers();
  }, []);

  const handleDelete = async (record) => {
    try {
      await axios.delete(`${base_url}/memberProfiles/${record._id}`);
      message.success("Member deleted successfully");
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== record._id)
      );
    } catch (error) {
      console.error(error);
      message.error("Failed to delete member");
    }
  };

  const handleEdit = async (record) => {
    try {
      const response = await axios.get(`${base_url}/memberProfiles/${record._id}`);
      setEditingMember(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch member details");
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(
        `${base_url}/memberProfiles/${editingMember._id}`,
        values
      );
      setMembers((prevMembers) =>
        prevMembers.map((member) =>
          member._id === editingMember._id ? { ...member, ...values } : member
        )
      );
      message.success("Member updated successfully");
      setIsModalVisible(false);
      setEditingMember(null);
    } catch (error) {
      console.error(error);
      message.error("Failed to update member");
    }
  };

  const columns = [
    {
      title: "Index",
      render: (_, __, index) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Position", dataIndex: "position" },
    { title: "Department", dataIndex: "department" },
    { title: "Education", dataIndex: "education" },
    { title: "Email", dataIndex: "email" },
    { title: "Phone", dataIndex: "phone" },
    {
      title: "Profile Image",
      dataIndex: "profileImage",
      render: (text) => (
        <img
          src={text}
          alt="Profile"
          style={{ width: 100, height: 100, objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            icon={<AiFillEdit />}
            className="mr-2"
          />
          <Button
            type="danger"
            onClick={() => handleDelete(record)}
            icon={<AiFillDelete style={{ color: "#da3838" }} />}
          />
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Committee</h3>
      <div className="table-responsive">
        <Table
          dataSource={members}
          columns={columns}
          rowKey="_id"
          className="table"
        />
      </div>

      <Modal
        title="Edit Member"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {editingMember && (
          <Form
            initialValues={{
              ...editingMember,
              dateOfJoining: new Date(editingMember.dateOfJoining)
                .toISOString()
                .split("T")[0],
            }}
            onFinish={handleUpdate}
            layout="vertical"
          >
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Position" name="position">
              <Input />
            </Form.Item>
            <Form.Item label="Department" name="department">
              <Input />
            </Form.Item>
            <Form.Item label="Education" name="education">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Update Member
            </Button>
          </Form>
        )}
      </Modal>
    </div>
  );
};

export default MemberProfilelist;
