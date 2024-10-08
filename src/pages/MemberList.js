import React, { useState, useEffect } from "react";
import { base_url } from "../utils/base_url";
import axios from "axios";
import { Table, Button, Input, message } from "antd";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const MemberList = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${base_url}/members`);
        const data = response.data;
        setMembers(data);
        setFilteredMembers(data);
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
      setFilteredMembers((prevMembers) =>
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

      const response = await axios.post(
        `${base_url}uploadMemberdata`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("File uploaded successfully!");
        setFile(null);
        navigate("/admin/member-list");
        const updatedResponse = await axios.get(`${base_url}/members`);
        setMembers(updatedResponse.data);
        setFilteredMembers(updatedResponse.data);
      } else {
        toast.error("Error uploading file. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(value) ||
        member.membershipId.toLowerCase().includes(value)
    );

    setFilteredMembers(filtered);
  };

  const columns = [
    {
      title: "Index",
      render: (_, __, index) => index + 1,
    },
    { title: "Name", dataIndex: "name" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Phone", dataIndex: "membershipId" },
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
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">Upload CSV File</h3>
        <form onSubmit={handleSubmit} className="d-flex align-items-center">
          <div className="input-group me-2">
            <input
              type="file"
              accept=".csv"
              className="form-control"
              onChange={handleChange}
              aria-label="Upload CSV File"
            />
          </div>
          <button type="submit" className="btn btn-success">
            <i className="bi bi-upload"></i> Upload
          </button>
        </form>
      </div>

      <div className="mb-4">
        <Input
          placeholder="Search by name or phone"
          value={searchTerm}
          onChange={handleSearch}
          style={{ maxWidth: "100%", width: "100%" }}
        />
      </div>

      <div className="table-responsive">
        <Table
          dataSource={filteredMembers}
          columns={columns}
          rowKey="_id"
         className="custom-table"
        />
      </div>
    </div>
  );
};

export default MemberList;
