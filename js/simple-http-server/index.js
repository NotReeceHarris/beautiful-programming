'use strict';

const { route, server } = require('./core.js');

const DEFAULT_PORT = 8080;
const DEFAULT_LISTEN_CALLBACK = (port) => console.log(`Server listening on port ${port}`);

const addRoute = (path, callback) => {
    if (typeof path !== 'string' || typeof callback !== 'function') {
        throw new Error('Path must be a string and callback must be a function');
    }

    route(path, callback);
}

const startListening = (port = DEFAULT_PORT, callback = () => DEFAULT_LISTEN_CALLBACK(port)) => {
    if (typeof port !== 'number' || (callback && typeof callback !== 'function')) {
        throw new Error('Port must be a number and callback must be a function');
    }

    server.listen(port, callback);
}

module.exports = { route: addRoute, listen: startListening };