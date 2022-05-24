const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0,
    },
    history: {
        type: Array,
        default: [],
    },
}, { timestamps: true });