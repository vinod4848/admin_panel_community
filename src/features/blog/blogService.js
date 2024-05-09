import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getblogs = async () => {
  const response = await axios.get(`${base_url}blogs/`, Config);
  return response.data;
};
const createBlog = async (blog) => {
  try {
    const response = await axios.post(
      `${base_url}blogs`,
      blog,
      Config
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create blog: " + error.message);
  }
};
const updateBlog = async (blog) => {
  const response = await axios.put(
    `${base_url}blogs/${blog.id}`,
    {
      title: blog.blogData.title,
      description: blog.blogData.description,
      // category: blog.blogData.category,
    },
    { headers: Config }
  );
  return response.data;
};
const getBlog = async (id) => {
  const response = await axios.get(`${base_url}blogs/${id}`, Config);

  return response.data;
};
const deleteBlog = async (id) => {
  const response = await axios.delete(`${base_url}blogs/${id}`, Config);

  return response.data;
};
const blogService = {
  getblogs,
  createBlog,
  updateBlog,
  getBlog,
  deleteBlog,
};
export default blogService;
