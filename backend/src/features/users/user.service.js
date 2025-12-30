import bcrypt from "bcryptjs";
import { User } from "./users.model.js";

export const regeisterUser = async (username, password, phone, email) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword, phone, email });    
    await user.save();
    return user;
  } catch (error) {
    throw new Error("Lỗi hệ thống");
  }
};
