import { signToken } from "../../utils/jwt.js";
import { login } from "./auth.service.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await login(username, password);
    if (!token) {
      return res
        .status(401)
        .json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }
    res.json({ token });
  } catch (error) {
    if (error.message === "INVALID_CREDENTIALS") {
      return res
        .status(401)
        .json({ message: "Tên đăng nhập hoặc mật khẩu không đúng" });
    }
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
