import axios from "axios";

export const server = axios.create({
  baseURL: "https://do3lcit1p1.execute-api.us-east-1.amazonaws.com",
});
