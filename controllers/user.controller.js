const { createError } = require("../utils/createError");
const { isValidEmail } = require("../utils/validator");

const addNewUserController = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || fullName.trim() === "" || !email || email.trim() === "") {
      throw createError(400, "Username/Email is required");
    }

    if (!isValidEmail(email)) throw createError(400, "Invalid email address");

    if (!password || password.trim() === "")
      throw createError(401, "Invaid/Wrong password. Please Try again");

    return res
      .status(201)
      .json({ message: "user added successfully", email, fullName });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addNewUserController,
};
