import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getAllProduct = async () => {
  const response = await axios.get(`${base_url}product/getAllProduct`);
  return response.data;
};
const getProduct = async (id) => {
  debugger;
  const response = await axios.get(`${base_url}product/${id}`, Config);
  return response.data;
};
const createProduct = async (product) => {
  const response = await axios.post(
    `${base_url}product/addProduct`,
    product,
    Config
  );
  return response.data;
};
const deletProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, Config);
  return response.data;
};
const updateProduct = async (product) => {
  debugger
  const response = await axios.put(
    `${base_url}product/${product.id}`,
    {
      title: product.productData.title,
      description: product.productData.description,
      price: product.productData.price,
      brand: product.productData.brand,
      category: product.productData.category,
      tags: product.productData.tags,
      color: product.productData.color,
      quantity: product.productData.quantity,
      images: product.productData.images,
    },
    Config
  );
  return response.data;
};
const productService = {
  getAllProduct,
  createProduct,
  getProduct,
  deletProduct,
  updateProduct,
};
export default productService;
