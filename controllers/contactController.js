const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const ObjectId = require("mongoose").Types.ObjectId;

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create a new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    });

    res.status(201).json(contact);
});

//@desc Get an individual contact
//@route GET /api/contacts/:id
//@access public
const getIndividualContact = asyncHandler(async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    res.status(200).json(contact);
});

//@desc Update a contact by ID
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

//@desc Delete a contact by ID
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found.");
    }

    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json(contact);
});

module.exports = { getContact, createContact, getIndividualContact, updateContact, deleteContact };
