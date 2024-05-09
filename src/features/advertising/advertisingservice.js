import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getadvertising = async () => {
  const response = await axios.get(`${base_url}advertisements/`, Config);
  return response.data;
};
const createAdvertising = async (advertising) => {
  try {
    const response = await axios.post(
      `${base_url}advertisements`,
      advertising,
      Config
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create advertising: " + error.message);
  }
};
const updateAdvertising = async (advertising) => {
  const response = await axios.put(
    `${base_url}advertisements/${advertising.id}`,
    {
      clientName: advertising.advertisingData.clientName,
      companyName: advertising.advertisingData.companyName,
      image: advertising.advertisingData.image,
    },
    { headers: Config }
  );
  return response.data;
};
const getAdvertising = async (id) => {
  const response = await axios.get(`${base_url}advertisements/${id}`, Config);

  return response.data;
};
const deleteAdvertising = async (id) => {
  const response = await axios.delete(
    `${base_url}advertisements/${id}`,
    Config
  );

  return response.data;
};
const advertisingService = {
  getadvertising,
  createAdvertising,
  updateAdvertising,
  getAdvertising,
  deleteAdvertising,
};
export default advertisingService;
