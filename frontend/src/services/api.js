import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const getAnalytics = async () => {
  const res = await axios.get(`${BASE_URL}/analytics`);
  return res.data;
};

export const getDevices = async () => {
  const res = await axios.get(`${BASE_URL}/devices`);
  return res.data;
};
