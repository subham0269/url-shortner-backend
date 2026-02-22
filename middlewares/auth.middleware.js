const { fetchFromSession } = require("../utils/session");
const { createError } = require("../utils/createError");

class AuthMiddleware {
	checkValidUser = (req, res, next) => {
		try {
			const token = req.session?.u_s_us_sess;
			// console.log(232332, createError(401, "No session found. Please login first."))
			if (!token) {
				throw createError(401, "No session found. Please login first.");
			}
			const decoded = fetchFromSession(token);
			req.user = decoded;
			return next();
		} catch (err) {
			if (err.code === "TOKEN_EXPIRED") {
				throw createError(401, "Token expired");
			}
			next(err);
		}
	};
}

module.exports = new AuthMiddleware();