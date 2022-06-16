const routes = require("express").Router();
const contactRoutes = require("./contacts");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

routes.get("/", (req, res) => {
  res.send("Marcus Ojo-Osasere");
});

routes.use("/contacts", contactRoutes);

routes.use("/api-docs", swaggerUi.serve);
routes.get("/api-docs", swaggerUi.setup(swaggerDocument));

module.exports = routes;
