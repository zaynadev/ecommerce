const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
}, { timestamps: true });


module.exports = mongoose.model('Catgory', categorySchema);