import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getAllCategory = async () => {
  const response = await axios.get(`${base_url}category/category`, Config);
  return response.data;
};
const createCategory = async (category) => {
  const response = await axios.post(
    `${base_url}category/category`,
    category,
    Config
  );
  return response.data;
};
const updateACategory = async (category) => {
  const response = await axios.put(
    `${base_url}category/${category.id}`,
    { title: category.categoryData.title },
    Config
  );
  return response.data;
};
const getCategory = async (id) => {
  const response = await axios.get(`${base_url}category/${id}`, Config);
  return response.data;
};
const deleteCategory = async (id) => {
  const response = await axios.delete(`${base_url}category/${id}`, Config);

  return response.data;
};
const ProductCategoryService = {
  getAllCategory,
  createCategory,
  updateACategory,
  getCategory,
  deleteCategory,
};
export default ProductCategoryService;
