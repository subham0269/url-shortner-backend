const { sql } = require("../config/neon.config");

const createNewUser = async (fullName, email, password) => {
  try {
    const result = await sql`
      INSERT INTO users.users
      (full_name, email_id, password)
      VALUES (${fullName}, ${email}, ${password})
      RETURNING user_id, email_id, created_at;
    `;
    return result;
  } catch (err) {
    throw err;
  }
};

const checkIfEmailExists = async (emailId) => {
  try {
    const result = await sql`
    SELECT * FROM users.users WHERE email_id=${emailId}
    `;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createNewUser,
  checkIfEmailExists,
};
