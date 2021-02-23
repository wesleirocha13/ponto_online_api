'use strict'

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');


const server = http.createServer(app);

server.listen(process.env.PORT || '3333');