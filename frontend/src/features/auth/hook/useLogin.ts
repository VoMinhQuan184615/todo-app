import { useState } from "react";
import { loginApi } from "@/api/auth.api";

type LoginPayload = {
  username: string;
  password: string;
};

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginPayload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await loginApi(data.username, data.password);
      localStorage.setItem("token", response.token);
      return response;
    } catch (err: any) {
      setError(err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
