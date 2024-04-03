const express = require("express");
const router = express.Router();

const { getContact, createContact, getIndividualContact, updateContact, deleteContact } = require("../controllers/contactController");

router.route("/").get(getContact).post(createContact);

router.route("/:id").get(getIndividualContact).put(updateContact).delete(deleteContact);

module.exports = router;