import axios from "axios";
import { base_url } from "../../utils/base_url";
import { Config } from "../../utils/axiosconfig";

const getEvents = async () => {
  const response = await axios.get(`${base_url}events/`, Config);
  return response.data;
};
const createEvent = async (event) => {
  try {
    const response = await axios.post(`${base_url}events`, event, Config);
    return response.data;
  } catch (error) {
    throw new Error("Failed to create event: " + error.message);
  }
};
const updateAEvent = async (event) => {
  const response = await axios.put(
    `${base_url}events/${event.id}`,
    {
      title: event.eventData.title,
      description: event.eventData.description,
      image: event.eventData.image,
      category: event.eventData.category,
      address: event.eventData.address,
      date: event.eventData.date,
      isActive:event.eventData.isActive
    },
    { headers: Config }
  );
  return response.data;
};
const getEvent = async (id) => {
  const response = await axios.get(`${base_url}events/${id}`, Config);

  return response.data;
};
const deleteEvent = async (id) => {
  const response = await axios.delete(`${base_url}events/${id}`, Config);

  return response.data;
};
const eventService = {
  getEvents,
  createEvent,
  updateAEvent,
  getEvent,
  deleteEvent,
};
export default eventService;
