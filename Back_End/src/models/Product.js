const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    price: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    userId: {
        type: String,
    },
    company: {
        type: String,
        required: true
    }
})

const ProductData = new mongoose.model('product',productSchema);
module.exports = ProductData;