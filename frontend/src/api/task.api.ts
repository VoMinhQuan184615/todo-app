import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchTasksApi = async (selectedDate) => {
  const response = await axios.get(`${API_URL}/api/tasks`, {
    params: {
      filter: "dates",
      date: selectedDate,
    },
  });

  return response.data;
};

export const createTaskApi = async (title: string) => {
  const response = await axios.post(`${API_URL}/api/tasks`, { title });
  return response.data;
};
