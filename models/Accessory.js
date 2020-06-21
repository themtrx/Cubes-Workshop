const mongoose = require('mongoose');

const AccessorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 2000
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
})

module.exports = mongoose.module('Accessory', AccessorySchema);