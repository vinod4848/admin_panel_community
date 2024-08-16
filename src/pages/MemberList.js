import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Table, Button, message } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

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

  const handleDelete = async (record) => {
    try {
      await axios.delete(`${base_url}/members/${record._id}`);
      message.success("Member deleted successfully");
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member._id !== record._id)
      );
    } catch (error) {
      console.error(error);
      message.error("Failed to delete member");
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile && selectedFile.type !== "text/csv") {
      toast.error("Only CSV files are supported.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(`${base_url}uploadMemberdata`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        setFile(null); 
        navigate("/admin/member-list");
        const updatedResponse = await axios.get(`${base_url}/members`);
        setMembers(updatedResponse.data);
      } else {
        toast.error("Error uploading file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
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
        <Button
          type="danger"
          onClick={() => handleDelete(record)}
          icon={<AiFillDelete style={{ color: "#da3838" }} />}
        />
      ),
    },
  ];

  return (
    <div>
      {/* <h1>Member List</h1> */}
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h3>Upload CSV File</h3>
        <form onSubmit={handleSubmit} className="d-flex">
          <input
            type="file"
            accept=".csv"
            className="form-control me-2"
            onChange={handleChange}
          />
          <button type="submit" className="btn btn-success">
            Upload CSV
          </button>
        </form>
      </div>
      <Table dataSource={members} columns={columns} rowKey="_id" />
    </div>
  );
};

export default MemberList;
