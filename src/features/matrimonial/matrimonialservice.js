import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getMatrimonials = async () => {
  const response = await axios.get(`${base_url}matrimonial/profiles/`, Config);
  return response.data;
};
const createMatrimonial = async (matrimonial) => {
  try {
    const response = await axios.post(
      `${base_url}matrimonial/profiles`,
      matrimonial,
      Config
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create matrimonial: " + error.message);
  }
};
const updateMatrimonial = async (matrimonial) => {
  const profileData = {
    firstName: matrimonial.matrimonialData.firstName,
    lastName: matrimonial.matrimonialData.lastName,
    image: matrimonial.matrimonialData.image,
    gender: matrimonial.matrimonialData.gender,
    dateOfBirth: matrimonial.matrimonialData.dateOfBirth,
    email: matrimonial.matrimonialData.email,
    phone: matrimonial.matrimonialData.phone,
    profession: matrimonial.matrimonialData.profession,
    income: matrimonial.matrimonialData.income,
    nativePlace: matrimonial.matrimonialData.nativePlace,
    height: matrimonial.matrimonialData.height,
    family: {
      fatherName: matrimonial.matrimonialData.family.fatherName,
      motherName: matrimonial.matrimonialData.family.motherName,
      siblings: {
        brothers: matrimonial.matrimonialData.family.siblings.brothers,
        sisters: matrimonial.matrimonialData.family.siblings.sisters,
      },
    },
    address: {
      street: matrimonial.matrimonialData.address.street,
      city: matrimonial.matrimonialData.address.city,
      state: matrimonial.matrimonialData.address.state,
      country: matrimonial.matrimonialData.address.country,
      postalCode: matrimonial.matrimonialData.address.postalCode,
    },
    education: {
      degree: matrimonial.matrimonialData.education.degree,
      institution: matrimonial.matrimonialData.education.institution,
      completionYear: matrimonial.matrimonialData.education.completionYear,
    },
  };

  const response = await axios.put(
    `${base_url}matrimonial/profiles/${matrimonial.id}`,
    profileData,
    { headers: Config }
  );

  return response.data;
};
const getMatrimonial = async (id) => {
  const response = await axios.get(
    `${base_url}matrimonial/profiles/${id}`,
    Config
  );

  return response.data;
};
const deleteMatrimonial = async (id) => {
  const response = await axios.delete(
    `${base_url}matrimonial/profiles/${id}`,
    Config
  );

  return response.data;
};
const matrimonialService = {
  getMatrimonials,
  createMatrimonial,
  updateMatrimonial,
  getMatrimonial,
  deleteMatrimonial,
};
export default matrimonialService;
