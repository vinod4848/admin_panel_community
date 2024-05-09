import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getenquiries = async () => {
  const response = await axios.get(`${base_url}enq/getAllenq`, Config);
  return response.data;
};
const deleteEnquiry = async (id) => {
  const response = await axios.delete(`${base_url}enq/${id}`, Config);
  return response.data;
};
const getEnquiry = async (id) => {
  const response = await axios.get(`${base_url}enq/${id}`,Config);
  return response.data;
};
const udpateEnquiry = async (enq) => {
  const response = await axios.put(
    `${base_url}enq/${enq.id}`,
    { status: enq.enqData },
    Config
  );
  return response.data;
};
const enquirieService = {
  getenquiries,
  udpateEnquiry,
  getEnquiry,
  deleteEnquiry,
};
export default enquirieService;
