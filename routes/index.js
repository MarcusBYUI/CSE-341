const routes = require("express").Router();

routes.get("/", (req, res) => {
  res.send("Marcus Ojo-Osasere");
});

module.exports = routes;
