'use strict'

const mongoose = require("mongoose");
const Schedules = mongoose.model('Schedules');

exports.get = async () => {
    const res = await Schedules.find()
    return res;
}

exports.getById = async (id) => {
    const res = await Schedules.findById(id);
    return res;
}

exports.create = async (body) => {
    var schedules = new Schedules(body);
    await schedules.save();
}

exports.update = async (id, body) => {
    await Schedules
        .findByIdAndUpdate(id, {
            // procura pelo o id e atualiza os campos desejados
            $set: {
                day: body.day,
                entry: body.entry,
                exit: body.exit,
                daytime_hours: body.daytime_hours,
                night_hours: body.night_hours,
                total: body.total,
            }
        });
}
