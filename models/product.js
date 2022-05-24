const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    description: {
        type: String,
        maxlength: 2000,
        required: true
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
        default: 1
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    category: {
        type: ObjectId,
        ref: 'Category',
        required: true,
    },
    shipping: {
        required: false,
        type: Boolean,
        default: false,
    }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);