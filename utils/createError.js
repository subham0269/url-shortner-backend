class ApiError extends Error {
  status;
  details;

  constructor(status, message, details) {
    super(message);
    this.status = status;
    this.details = details;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Creates a new ApiError
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @param {unknown} [details] - Optional extra details about the error
 * @returns {ApiError}
 */
function createError(status, message, details) {
  return new ApiError(status, message, details);
}

// Export both
module.exports = {
  ApiError,
  createError,
};
