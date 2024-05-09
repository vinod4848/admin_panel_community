import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getNews = async () => {
  const response = await axios.get(`${base_url}news/`, Config);
  return response.data;
};
const createNewService = async (job) => {
  try {
    const response = await axios.post(`${base_url}news`, job, Config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create news: " + error.message);
  }
};
const updateNew = async (job) => {
  const response = await axios.put(
    `${base_url}news/${job.id}`,
    {
      title: job.jobData.title,
      content: job.jobData.content,
      author: job.jobData.author,
      category: job.jobData.category,
      tags: job.jobData.tags,
      image: job.jobData.image,
    },
    { headers: Config }
  );
  return response.data;
};
const getNew = async (id) => {
  const response = await axios.get(`${base_url}news/${id}`, Config);

  return response.data;
};
const deleteNew = async (id) => {
  const response = await axios.delete(`${base_url}news/${id}`, Config);

  return response.data;
};
const newService = {
  getNews,
  createNewService,
  updateNew,
  getNew,
  deleteNew,
};
export default newService;
