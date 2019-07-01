const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);