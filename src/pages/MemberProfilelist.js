import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, message, Modal, Input, Form, Upload } from "antd";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { base_url } from "../utils/base_url";
import { UploadOutlined } from "@ant-design/icons";

const MemberProfilelist = () => {
  const [members, setMembers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await axios.get(`${base_url}/memberProfiles`);
      setMembers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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
      setFileList([]); // Clear file list when editing
      setIsModalVisible(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch member details");
    }
  };

  const handleUpdate = async (values) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "profileImage") {
          if (fileList.length > 0) {
            formData.append(key, fileList[0]);
          }
        } else {
          formData.append(key, values[key]);
        }
      });

      await axios.put(`${base_url}/memberProfiles/${editingMember._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      fetchMembers(); 

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
            style={{ marginRight: '8px' }} 
          />
          <Button
            type="primary"
            onClick={() => handleDelete(record)}
            icon={<AiFillDelete />}
            style={{ backgroundColor: "#da3838", borderColor: "#da3838" }}
          />
        </>
      ),
    }
    
  ];

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Committee</h3>
      <div className="table-responsive">
        <Table
          dataSource={members}
          columns={columns}
          rowKey="_id"
          className="custom-table"
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
            <Form.Item label="Profile Image" name="profileImage">
              <Upload
                listType="picture"
                fileList={fileList}
                beforeUpload={(file) => {
                  setFileList([file]);
                  return false;
                }}
                onRemove={() => setFileList([])}
              >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
              </Upload>
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
