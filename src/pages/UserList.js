import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAUser, GetUsers, updateAUser } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import CustomModel from "../components/CustomModel";
import axios from "axios";
import { base_url } from "../utils/base_url";

const columns = [
  {
    title: "SN",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "username",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.username.length - b.username.length,
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
  {
    title: "Activate",
    dataIndex: "activate",
  },
];

const UserList = () => {
  const [userId, setUserId] = useState();
  const [open, setOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [searchUsername, setSearchUsername] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const userState = useSelector((state) => state.user.users);

  const transformUserData = () => {
    return userState
      .filter(
        (user) => user.role !== "admin" && user.isPublished && !user.isBlocked
      )
      .map((user, index) => ({
        key: index + 1,
        username: user.username,
        email: user.email,
        phone: user.phone,
        action: (
          <>
            <Link to={`/admin/users/${user._id}`} className="fs-3 text-danger">
              <BiEdit />
            </Link>
            <button
              className="ms-2 fs-3 text-danger bg-transparent border-0"
              onClick={() => showModal(user._id)}
            >
              <MdOutlineDelete />
            </button>
          </>
        ),
        activate: (
          <Button
            type="primary"
            onClick={() => handleActivateDeactivate(user._id, !user.isBlocked)}
          >
            {user.isBlocked ? "Activate" : "Block"}
          </Button>
        ),
      }));
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `${base_url}user/searchUser?email=${searchEmail}&phone=${searchPhone}&username=${searchUsername}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };
  const handleActivateDeactivate = async (userId, isBlocked) => {
    try {
      await axios.put(`${base_url}user/blockedUser/${userId}`, {
        isBlocked: isBlocked,
      });
      dispatch(updateAUser({ userId, isBlocked }));
      setTimeout(() => {
        dispatch(GetUsers());
      }, 100);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const showModal = (userId) => {
    setOpen(true);
    setUserId(userId);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${base_url}user/deleteUser/${userId}`);
      dispatch(deleteAUser(userId));
      setOpen(false);
      dispatch(GetUsers());
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title" style={{ color: "green" }}>
        Active Users
      </h3>
      <div
        className="mb-2"
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: "17px",
          width:"260",
          height:"37px",
        }}
      >
        <input 
          type="text"
          placeholder=" Search By Email Phone Username"
          value={searchEmail || searchPhone || searchUsername}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.includes("@")) {
              setSearchEmail(inputValue);
              setSearchPhone("");
              setSearchUsername("");
            } else if (inputValue.length > 0) {
              setSearchPhone("");
              setSearchUsername(inputValue);
              setSearchEmail("");
            } else {
              setSearchPhone("");
              setSearchUsername("");
              setSearchEmail("");
            }
          }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={transformUserData()} />
      </div>
      <CustomModel
        hideModal={hideModal}
        open={open}
        PerformAction={() => {
          handleDeleteUser(userId);
        }}
        title="Are you sure you want to delete this User"
      />
    </div>
  );
};

export default UserList;
