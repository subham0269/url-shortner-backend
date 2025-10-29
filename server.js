require("dotenv").config();
const express = require("express");
const swaggerui = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const cors = require("cors");
const { apiRouter } = require("./apiRouter");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
const PORT = 8080;
const cookie_secret = process.env.COOKIE_SECRET;

const swagger_yaml_document = yaml.load(
  fs.readFileSync(__dirname + "/swagger.yml", "utf-8")
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  cookieSession({
    name: "session",
    keys: [cookie_secret],
    maxAge: 10 * 1000,
    sameSite: "lax",
    secure: false,
  })
); // 10 * 1000 -> 10secs

app.use("/docs", swaggerui.serve, swaggerui.setup(swagger_yaml_document));

app.use("/api", apiRouter);

// global error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    status: err.status,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
