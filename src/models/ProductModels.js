const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Product', productsSchema);
