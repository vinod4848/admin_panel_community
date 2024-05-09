import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const uploadImages = async (data) => {
  const response = await axios.post(`${base_url}upload/`, data, Config);
  return response.data;
};
const deleteImages = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    Config
  );
  return response.id;
};

const uploadBlogimage = async (id) => {
  const response = await axios.delete(
    `${base_url}uploadImage/blogs/${id}`,
    Config
  );
  return response.id;
};

const uploadService = {
  uploadImages,
  deleteImages,
  uploadBlogimage
};
export default uploadService;
