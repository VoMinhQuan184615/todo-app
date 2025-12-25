import { User } from "./users.model.js";
import bcrypt from "bcryptjs";
export const regeisterUser = async (req, res) => {
  try {
    const { username, password, phone, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, phone, email });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
