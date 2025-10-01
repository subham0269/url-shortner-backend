const {
  createNewUser,
  checkIfEmailExists,
} = require("../services/user.service");
const { createError } = require("../utils/createError");
const { isValidEmail } = require("../utils/validator");
const {
  createPasswordHash,
  checkIfPasswordMatches,
} = require("../utils/password");
const { createSessionHash, fetchFromSession } = require("../utils/session");

const addNewUserController = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || fullName.trim() === "" || !email || email.trim() === "") {
      throw createError(400, "Username/Email is required");
    }

    if (!isValidEmail(email)) throw createError(400, "Invalid email address");

    if (!password || password.trim() === "")
      throw createError(401, "Invaid/Wrong password. Please Try again");

    const isEmailExists = (await checkIfEmailExists(email)).length > 0;

    if (isEmailExists) {
      return res.status(409).json({
        message: "Email address already exist. Please try another one.",
        data: { email },
      });
    }

    const hashedPassword = await createPasswordHash(password);

    const data = await createNewUser(
      fullName.trim(),
      email.trim(),
      hashedPassword
    );

    return res.status(201).json({ message: "User added successfully!!", data });
  } catch (err) {
    next(err);
  }
};

const fetchExistingUserController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || email.trim() === "" || !password || password.trim() === "") {
      throw createError(400, "Email/password is required.");
    }

    if (!isValidEmail(email)) {
      throw createError(400, "Invalid email address");
    }

    const userData = await checkIfEmailExists(email);

    if (userData.length === 0) {
      throw createError(401, "The email or password you entered is incorrect");
    }

    const storedPass = userData[0].password;

    const isPasswordMatched = await checkIfPasswordMatches(
      storedPass,
      password
    );
    if (!isPasswordMatched)
      throw createError(409, "Invalid email or password.");

    req.session.u_s_us_sess = await createSessionHash(userData[0]);

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addNewUserController,
  fetchExistingUserController,
};
