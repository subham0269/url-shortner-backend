const validator = require("validator");

/**
 * Validates the email
 * @param {string} str - Email Id as a string
 * @returns {boolean} True if valid email, false otherwise
 */
const isValidEmail = (str) => validator.isEmail(str);

module.exports = {
  isValidEmail,
};
