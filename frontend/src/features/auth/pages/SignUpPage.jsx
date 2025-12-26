import { SignupForm } from "@/features/auth/components/signup-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSignup } from "../hook/useSignup";

export default function SignUpPage() {
  const navigate = useNavigate();
  const { signup } = useSignup();
  const handleSumit = async (data) => {
    try {
      console.log(data);
      await signup(data);
      toast.success("Signup successful");
      navigate("/login");
    } catch (error) {
      toast.error("Signup failed");
    }
  };
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm onSubmit={handleSumit} />
      </div>
    </div>
  );
}
