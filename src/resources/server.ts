import axios from "axios";

export const server = axios.create({
  baseURL: process.env.API_BASE_URL,
});
