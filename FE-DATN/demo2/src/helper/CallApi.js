import axios from "axios";

const BASE_URL = "http://localhost:3001"; // json-server chạy ở đây

export const CallApi = {
  get: (endpoint) => axios.get(`${BASE_URL}/${endpoint}`),
  post: (endpoint, data) => axios.post(`${BASE_URL}/${endpoint}`, data),
  put: (endpoint, id, data) => axios.put(`${BASE_URL}/${endpoint}/${id}`, data),
  delete: (endpoint, id) => axios.delete(`${BASE_URL}/${endpoint}/${id}`),
};
