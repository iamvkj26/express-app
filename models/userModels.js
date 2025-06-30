const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    email: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    age: {
        required: true,
        type: Number
    },
    gender: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    }
});

module.exports = mongoose.model("User", dataSchema);