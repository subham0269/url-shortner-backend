const express = require("express");
const swaggerui = require("swagger-ui-express");
const yaml = require("js-yaml");
const fs = require("fs");
const { helloRouter } = require("./routes/hello");

const app = express();
const PORT = 8080;

const swagger_yaml_document = yaml.load(
  fs.readFileSync(__dirname + "/swagger.yml", "utf-8")
);
app.use("/docs", swaggerui.serve, swaggerui.setup(swagger_yaml_document));

app.use("/hello", helloRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
