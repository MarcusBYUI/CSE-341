const express = require("express");

const contactController = require("../controllers/contact");

const router = express.Router();

router.get("/", contactController.getData);

router.get("/:id?", contactController.getDataById);

module.exports = router;
