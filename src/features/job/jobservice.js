import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getJobs = async () => {
  const response = await axios.get(`${base_url}jobs/`, Config);
  return response.data;
};
const createJob = async (job) => {
  try {
    const response = await axios.post(`${base_url}jobs`, job, Config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create job: " + error.message);
  }
};
const updateJob = async (job) => {
  const response = await axios.put(
    `${base_url}jobs/${job.id}`,
    {
      title: job.jobData.title,
      company: job.jobData.company,
      location: job.jobData.location,
      description: job.jobData.description,
      responsibilities: job.jobData.responsibilities,
      qualifications: job.jobData.qualifications,
      skills: job.jobData.skills,
      employmentType: job.jobData.employmentType,
      experienceLevel: job.jobData.experienceLevel,
      educationLevel: job.jobData.educationLevel,
      salary: job.jobData.salary,
      applicationDeadline: job.jobData.applicationDeadline,
      contactEmail: job.jobData.contactEmail,
    },
    { headers: Config }
  );
  return response.data;
};
const getJob = async (id) => {
  const response = await axios.get(`${base_url}jobs/${id}`, Config);

  return response.data;
};
const deleteJob = async (id) => {
  const response = await axios.delete(`${base_url}jobs/${id}`, Config);

  return response.data;
};
const jobService = {
  getJobs,
  createJob,
  updateJob,
  getJob,
  deleteJob,
};
export default jobService;
