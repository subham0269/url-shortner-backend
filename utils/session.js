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
  try {
    if (typeof token !== "string") {
      return null;
    }

    const verify = jwt.verify(token, secret);
    return verify;
  } catch (err) {
    return {};
  }
};

module.exports = {
  fetchFromSession,
  createSessionHash,
};
