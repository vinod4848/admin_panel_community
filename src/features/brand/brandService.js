import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getBrands = async () => {
  const response = await axios.get(`${base_url}brand/getAllbrand`,Config);
  return response.data;
};
const createBrand = async (brand) => {
  const response = await axios.post(
    `${base_url}brand/createbrand`,
    brand,
    Config
  );
  return response.data;
};
const updateAbrand = async (brand) => {
  const response = await axios.put(
    `${base_url}brand/${brand.id}`,
    { title: brand.brandData.title },
    Config
  );

  return response.data;
};
const getBrand = async (id) => {
  const response = await axios.get(`${base_url}brand/${id}`, Config);

  return response.data;
};
const deletBrand = async (id) => {
  const response = await axios.delete(`${base_url}brand/${id}`, Config);

  return response.data;
};
const brandService = {
  getBrands,
  createBrand,
  getBrand,
  updateAbrand,
  deletBrand,
};
export default brandService;
