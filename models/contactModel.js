const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: [true, "Please include a contact name."]
        },
        email: {
            type: String,
            required: [true, "Please include a contact email."]
        },
        phone: {
            type: String,
            required: [true, "Please include a contact phone number."]
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);