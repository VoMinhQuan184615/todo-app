import jwt from "jsonwebtoken";

/**
 * Lấy JWT secret từ env
 */
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET_KEY;
  if (!secret) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
  return secret;
};

/**
 * Sign access token (GENERATE TOKEN)
 * payload: { id, email, roles }
 */
export const signToken = (payload, options = {}) => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    ...options,
  });
};

/**
 * Verify access token (dùng cho middleware)
 */
export const verifyToken = (token) => {
  const secret = getJwtSecret();

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

/**
 * Verify token nhưng bỏ qua expiration
 * 👉 DÙNG CHO REFRESH TOKEN
 */
export const verifyTokenIgnoreExpiration = (token) => {
  const secret = getJwtSecret();

  try {
    return jwt.verify(token, secret, {
      ignoreExpiration: true,
    });
  } catch (err) {
    throw new Error("Invalid token");
  }
};

/**
 * Decode token (KHÔNG verify)
 * 👉 chỉ dùng debug
 */
export const decodeToken = (token) => {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
};

/**
 * Lấy token từ Authorization header
 * Authorization: Bearer <token>
 */
export const extractTokenFromHeader = (authHeader) => {
  if (!authHeader) return null;
  if (!authHeader.startsWith("Bearer ")) return null;

  return authHeader.split(" ")[1];
};
