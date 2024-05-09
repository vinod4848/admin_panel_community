import { Table, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, updateAUser } from "../features/user/userSlice";
import { base_url } from "../utils/base_url";

import axios from "axios";

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
    title: "Activate",
    dataIndex: "activateDeactivate",
  },
];

const UserListApprovalPending = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetUsers());
  }, [dispatch]);

  const userState = useSelector((state) => state.user.users);

  const transformUserData = () => {
    return userState
      .filter((user) => user.role !== "admin" && !user.isPublished)
      .map((user, index) => ({
        key: index + 1,
        username: user.username,
        email: user.email,
        phone: user.phone,
        activateDeactivate: (
          <Button
            type="primary"
            onClick={() =>
              handleActivateDeactivate(user._id, !user.isPublished)
            }
          >
            {user.isPublished ? "Deactivate" : "Activate"}
          </Button>
        ),
      }));
  };

  const handleActivateDeactivate = async (userId, isPublished) => {
    try {
      await axios.post(`${base_url}user/updateUser/${userId}`, {
        isPublished: isPublished,
      });
      dispatch(updateAUser({ userId, isPublished }));
      setTimeout(() => {
        dispatch(GetUsers());
      }, 100);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4 title" style={{ color: "green" }}>
        Users Waiting for Approval
      </h3>
      <div>
        <Table columns={columns} dataSource={transformUserData()} />
      </div>
    </div>
  );
};

export default UserListApprovalPending;
