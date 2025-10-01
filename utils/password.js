const argon2 = require("argon2");

const createPasswordHash = async (password) => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (err) {
    throw err;
  }
};

const checkIfPasswordMatches = async (hash, password) => {
  try {
    const isMatched = await argon2.verify(hash, password);
    return isMatched;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createPasswordHash,
  checkIfPasswordMatches,
};
