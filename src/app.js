'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();
const router = express.Router();


// Conecta no banco
mongoose.connect(config.connectionString , { useNewUrlParser: true, useUnifiedTopology: true });

//Carrega models
const Schedules = require('./models/schedules_model');

// Carrga as rotas
const indexRoute = require('./routes/index_route');
const schedulesRoute = require('./routes/schedules_route');

// Usando o cors para conectar com o front
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Importa as rotas
app.use('/', indexRoute);
app.use('/schedules', schedulesRoute);

module.exports = app;