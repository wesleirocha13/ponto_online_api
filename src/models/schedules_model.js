'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Criando o esquema do banco de dados
const schema = new Schema({    
    
    dtEntry: {
        type: Date,
        required: true,
    },

    entry: {
        type: String,
        required: true,
    },

    dtExit: {
        type: Date,
        required: true,
    },

    exit: {
        type: String,
        required: true,
    },

    daytime_hours: {
        type: String,
        required: true,
    },

    night_hours: {
        type: String,
        required: true,
    },

    total_hours: {
        type: String,
        required: true,
    },

    createdDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Schedules', schema);