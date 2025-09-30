require("dotenv").config();
const express = require("express");
const swaggerui = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const { apiRouter } = require("./apiRouter");

const app = express();
const PORT = 8080;

const swagger_yaml_document = yaml.load(
  fs.readFileSync(__dirname + "/swagger.yml", "utf-8")
);

app.use(express.json());

app.use("/docs", swaggerui.serve, swaggerui.setup(swagger_yaml_document));

app.use("/api", apiRouter);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(err.status || 500).json({
    status: err.status,
    error: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
