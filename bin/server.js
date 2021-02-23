'use strict'

const app = require('../src/app');
const http = require('http');
const debug = require('debug')('nodestr:server');

const port = normalizePort(process.env.PORT || 3333);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
