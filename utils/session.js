const jwt = require("jsonwebtoken");

const createSessionHash = async (data) => {
  const secret = process.env.JWT_SECRET;
  try {
    const { user_id, full_name, email_id, created_at, ...rest } = data;
    const token = jwt.sign({ user_id, email_id, created_at }, secret, {
      algorithm: "HS256",
      expiresIn: "10s",
    });
    return token;
  } catch (err) {
    throw err;
  }
};

const fetchFromSession = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!token || typeof token !== "string") return null;
  if (!secret) throw new Error("JWT_SECRET missing");

  try {
    return jwt.verify(token, secret);
  } catch(err) {
    if (err.name === "TokenExpiredError") {
      const error = new Error("TOKEN_EXPIRED");
      error.code = "TOKEN_EXPIRED";
      throw error;
    }
    throw err;
  }
};

module.exports = {
  fetchFromSession,
  createSessionHash,
};
