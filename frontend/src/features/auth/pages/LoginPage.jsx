import { toast } from "../../../../node_modules/sonner/dist/index";
import { LoginForm } from "../components/login-form";
import { useLogin } from "../hook/useLogin";

export default function LoginPage() {
  const { login } = useLogin();

  const handleSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Login successful");
    } catch (error) {
      toast.error("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-background/80">
      <LoginForm className="w-full max-w-sm" onSubmit={handleSubmit} />
    </div>
  );
}
