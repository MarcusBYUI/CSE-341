const express = require("express");

const contactController = require("../controllers/contacts.js");

const router = express.Router();

router.get("/", contactController.getData);

router.get("/:id", contactController.getDataById);

router.post("/", contactController.insertContact);

router.put("/:id", contactController.updateContact);

router.delete("/:id", contactController.deleteDocById);

module.exports = router;
