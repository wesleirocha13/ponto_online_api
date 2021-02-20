'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({    
    
    date: {
        type: Date,
        default: Date.now
    },
    
    day: {
        type: String,
        required: true,
    },

    entry: {
        type: String,
        required: true,
    },

    exit: {
        type: String,
        required: true,
    },

    daytime_hours: {
        type: Number,
        required: true,
    },

    night_hours: {
        type: Number,
        required: true,
    },

    total: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Schedules', schema);