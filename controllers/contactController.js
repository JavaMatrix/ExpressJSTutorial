const asyncHandler(asyncHandler = require("express-async-handler");

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: "Page to get all contacts, using router."});
});

//@desc Create a new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory!");
    }
    res.status(201).json({message: "Page to create new contacts, using router."});
});

//@desc Get an individual contact
//@route GET /api/contacts/:id
//@access public
const getIndividualContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Page to get contact ${req.params.id}, using router.`});
});

//@desc Update a contact by ID
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Page to update ${req.params.id}, using router.`});
});

//@desc Delete a contact by ID
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(200).json({message: `Page to delete ${req.params.id}, using router.`});
});

module.exports = {getContact, createContact, getIndividualContact, updateContact, deleteContact});
