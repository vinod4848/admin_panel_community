import axios from "axios";
import { base_url } from "../../utils/base_url";
// import { Config } from "../../utils/axiosconfig";

const getUsersService = async () => {
  const response = await axios.get(`${base_url}user/getAllUser/`);
  return response.data;
};
const createUserService = async (user) => {
  try {
    const response = await axios.post(`${base_url}user/signup`, user);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create user: " + error.message);
  }
};
const updateUserSercice = async (user) => {
  const response = await axios.put(`${base_url}user/updateUser/${user.id}`, {
    username: user.userData.username,
    email: user.userData.email,
    phone: user.userData.phone,
    role: user.userData.role,
    isPublished: user.userData.isPublished,
  });
  return response.data;
};
const getUserService = async (id) => {
  const response = await axios.get(`${base_url}user/getUserbyId${id}`);

  return response.data;
};
const deleteUserSercice = async (id) => {
  const response = await axios.delete(`${base_url}user/deleteUser${id}`);

  return response.data;
};
const userService = {
  getUsersService,
  createUserService,
  updateUserSercice,
  getUserService,
  deleteUserSercice,
};
export default userService;
