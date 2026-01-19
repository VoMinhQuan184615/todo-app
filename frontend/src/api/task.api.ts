import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
});

// Add JWT token to every request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const fetchTasksApi = async (selectedDate) => {
  // Format date to YYYY-MM-DD string using local timezone
  let dateString;

  if (selectedDate instanceof Date) {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const date = String(selectedDate.getDate()).padStart(2, "0");
    dateString = `${year}-${month}-${date}`;
  } else {
    dateString = selectedDate;
  }

  const response = await apiClient.get(`/api/tasks`, {
    params: {
      filter: "dates",
      date: dateString,
    },
  });

  return response.data;
};

export const createTaskApi = async (taskData: {
  title: string;
  description?: string;
  priority?: string;
}) => {
  const response = await apiClient.post(`/api/tasks`, taskData);
  return response.data;
};
