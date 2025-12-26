import { useState } from "react";
import { signupApi } from "@/api/auth.api";

type SignupPayload = {
  username: string;
  password: string;
  phone: string;
  email: string;
};

export const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const signup = async (data: SignupPayload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await signupApi(
        data.username,
        data.password,
        data.phone,
        data.email
      );
      return response;
    } catch (err: any) {
      setError(err.message || "Signup failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { signup, loading, error };
};
