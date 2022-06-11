const express = require("express");

const contactController = require("../controllers/contact");

const router = express.Router();

router.get("/", contactController.Data);

router.get("/:id", contactController.DataById);

module.exports = router;
