'use strict'

const mongoose = require("mongoose");
const Schedules = mongoose.model('Schedules');

// Busca os horários cadastrados
exports.get = async () => {
    const res = await Schedules.find()
    return res;
}

// Insere ponto no banco de dados
exports.create = async (body) => {
    var schedules = new Schedules(body);
    await schedules.save();
}