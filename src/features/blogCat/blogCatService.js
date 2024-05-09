import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getblogCats = async () => {
  const response = await axios.get(`${base_url}blogCat/getAllblogCat`, Config);
  return response.data;
};
const createBlogCat = async (blogCat) => {
  const response = await axios.post(
    `${base_url}blogCat/createblogCat`,
    blogCat,
    Config
  );
  return response.data;
};
const updateABlogCat = async (blogCat) => {
  const response = await axios.put(
    `${base_url}blogCat/${blogCat.id}`,
    { title: blogCat.blogCatData.title },
    Config
  );
  return response.data;
};
const getBlogCat = async (id) => {
  const response = await axios.get(`${base_url}blogCat/${id}`, Config);
  return response.data;
};
const deleteBlogCat = async (id) => {
  const response = await axios.delete(`${base_url}blogCat/${id}`, Config);
  return response.data;
};
const blogCatService = {
  getblogCats,
  createBlogCat,
  getBlogCat,
  deleteBlogCat,
  updateABlogCat,
};
export default blogCatService;
