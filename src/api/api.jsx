import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post("/users/register", data);
export const login = (data) => api.post("/users/login", data);
export const logout = () => api.post("/users/logout");
export const getCurrentUser = () => api.get("/users/me");

export const getPersonalExpenses = () => api.get("/personal-expenses");
export const addPersonalExpense = (data) =>
  api.post("/personal-expenses", data);
export const updateExpense = (id, data) =>
  api.put(`/personal-expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/personal-expenses/${id}`);

export const createGroup = (data) => api.post("/groups", data);
export const getGroups = () => api.get("/groups");
export const deleteGroup = (id) => api.delete(`/groups/${id}`);
export const getGroupDetails = (id) => api.get(`/groups/${id}`);
export const addGroupExpense = (groupId, data) =>
  api.post(`/groups/${groupId}/expenses`, data);
export const getGroupExpenses = (groupId) =>
  api.get(`/groups/${groupId}/expenses`);
export const calculateSplit = (groupId) => api.get(`/groups/${groupId}/split`);

export default api;
