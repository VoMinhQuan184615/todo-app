import {
  extractTokenFromHeader,
  verifyToken,
  decodeToken,
} from "../../utils/jwt.js";

const authMiddleware = (req, res, next) => {
  const token = extractTokenFromHeader(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
export default authMiddleware;
