import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const authClient = axios.create({
  baseURL: API_URL,
});

export const loginApi = async (username: string, password: string) => {
  const response = await authClient.post(`/api/auth/login`, {
    username,
    password,
  });
  console.log(response.data);
  return response.data;
};

export const signupApi = async (
  username: string,
  password: string,
  phone: string,
  email: string
) => {
  const response = await authClient.post(`/api/users`, {
    username,
    password,
    phone,
    email,
  });
  return response.data;
};
