const validator = require("validator");

/**
 *
 * @param {string} str -Email Id as a string
 * @returns {boolean}
 */
const isValidEmail = (str) => validator.isEmail(str);

module.exports = {
  isValidEmail,
};
