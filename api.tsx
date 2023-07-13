import axios from "axios";

export const API_URL = "http://localhost:3000";

const createInstance = () => {
  const instance = axios.create({
    baseURL: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return instance;
};

export default createInstance();
