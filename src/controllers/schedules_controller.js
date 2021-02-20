'use strict'

const repository = require('../repositories/schedules_repository');
const guid = require('guid');

exports.get = async (req, res, next,) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.getById = async (req, res, next,) => {
    try {
        var data = await repository.getById(req.query.id);
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição: " + error,
        });
    }
}

exports.post = async (req, res, next,) => {
    try {
        await repository.create(req.body);
        res.status(201).send({ message: 'Ponto lançado com sucesso!' });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}

exports.put = async (req, res, next,) => {
    try {
        await repository.update(req.body.id, req.body);
        res.status(201).send({ message: "Ponto atualizado com sucesso!" });
    } catch (error) {
        res.status(500).send({
            message: "Falha ao processar sua requisição"
        });
    }
}
