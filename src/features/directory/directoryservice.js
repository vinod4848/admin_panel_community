import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getDirectorys = async () => {
  const response = await axios.get(`${base_url}directories/`, Config);
  return response.data;
};
const createDirectory = async (event) => {
  try {
    const response = await axios.post(`${base_url}directories`, event, Config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create Directories: " + error.message);
  }
};
const updateDirectory = async (event) => {
  const response = await axios.put(
    `${base_url}directories/${event.id}`,
    {
      name: event.directorieData.name,
      firstName: event.directorieData.firstName,
      lastName: event.directorieData.lastName,
      address: event.directorieData.address,
      description: event.directorieData.description,
      companyName: event.directorieData.companyName,
      establishedDate: event.directorieData.establishedDate,
      socialMediaLinks: event.directorieData.socialMediaLinks,
      tags: event.directorieData.tags,
    },
    { headers: Config }
  );
  return response.data;
};
const getDirectory = async (id) => {
  const response = await axios.get(`${base_url}directories/${id}`, Config);

  return response.data;
};
const deleteDirectory = async (id) => {
  const response = await axios.delete(`${base_url}directories/${id}`, Config);

  return response.data;
};
const directorieService = {
  getDirectorys,
  createDirectory,
  updateDirectory,
  getDirectory,
  deleteDirectory,
};
export default directorieService;
