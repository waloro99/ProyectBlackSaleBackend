const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({

    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    stocks: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Product',productSchema)