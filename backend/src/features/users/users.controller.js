import * as userService from "./user.service.js";
export const regeisterUser = async (req, res) => {
  try {
    const { username, password, phone, email } = req.body;
    const user = await userService.regeisterUser(
      username,
      password,
      phone,
      email
    );
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
