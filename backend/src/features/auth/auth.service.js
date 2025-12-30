import bcrypt from "bcryptjs";
import { User } from "../users/users.model.js";
import { signToken } from "../../utils/jwt.js";

export const login = async (username, password) => {
  const user = await User.findOne({ username });
  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const token = signToken({ id: user._id, username: user.username });
  console.log("Generated Token:", token);
  return token;
};
