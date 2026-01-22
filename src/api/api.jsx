import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const addPersonalExpense = (data) => api.post("/personal-expenses", data);
export const getPersonalExpenses  = () => api.get("/personal-expenses");export const getExpenseById = (id) => api.get(`/expenses/${id}`);
export const updateExpense = (id, data) => api.put(`/expenses/${id}`, data);
export const deleteExpense = (id) => api.delete(`/expenses/${id}`);
export const createGroup = (data) => api.post("/groups", data);
export const getGroups = () => api.get("/groups");
export const deleteGroup = (groupId) => api.delete(`/groups/${groupId}`);
export const addGroupExpense = (groupId, data) =>
  api.post(`/groups/${groupId}/expenses`, data);
export const getGroupExpenses = (groupId) =>
  api.get(`/groups/${groupId}/expenses`);
export const getGroupDetails = (groupId) => api.get(`/groups/${groupId}`);
export const calculateSplit = (groupId) => api.get(`/groups/${groupId}/split`);
export const getCurrentUser = () => api.get("/users/me");
export const register = (data) => api.post("/users/register", data);
export const login = (data) => api.post("/users/login", data);
export const logout = () => api.post("/users/logout");

export default api;
