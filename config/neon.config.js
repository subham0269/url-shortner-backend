const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.NEON_DB_URL);

module.exports.sql = sql;
