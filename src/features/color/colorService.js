import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getColors = async () => {
  const response = await axios.get(`${base_url}color/getAllcolor`, Config);
  return response.data;
};
const createColor = async (color) => {
  const response = await axios.post(
    `${base_url}color/createcolor`,
    color,
    Config
  );
  return response.data;
};
const updateAColor = async (color) => {
  const response = await axios.put(
    `${base_url}color/${color.id}`,
    { title: color.colorData.title },
    Config
  );
  return response.data;
};
const getColor = async (id) => {
  const response = await axios.get(`${base_url}color/${id}`, Config);
  return response.data;
};
const deleteColor = async (id) => {
  const response = await axios.delete(`${base_url}color/${id}`, Config);
  return response.data;
};
const colorService = {
  getColors,
  createColor,
  getColor,
  updateAColor,
  deleteColor,
};
export default colorService;
