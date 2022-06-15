const express = require("express");

const contactController = require("../controllers/contact.js");

const router = express.Router();

router.get("/", contactController.Data);

router.get("/:id", contactController.DataById);

router.post("/", contactController.addContact);

router.put("/:id", contactController.updateContact);

router.delete("/:id", contactController.deleteDocById);

module.exports = router;
