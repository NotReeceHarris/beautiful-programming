'use strict';

const net = require('net');

const parser = require('./parser.js');
const routerUtils = require('./router.js');
const responseUtils = require('./response.js');

const router = new routerUtils();

const HTTP_STATUS_NOT_FOUND = 404;
const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

const server = net.createServer((socket) => {
    socket.on('data', async (data) => {

        const request = parser.request(data);
        request.cookies = parser.cookies(request.headers);
        request.ip = socket.remoteAddress;

        const route = router.findRoute(request.path);
        const response = new responseUtils.generator();

        if (route) {
            try {
                await route.callback(request, response);
            } catch (error) {
                console.error('An error occurred:', error);
                response.statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR;
                response.send('Internal Server Error');
            }
        } else {
            response.statusCode = HTTP_STATUS_NOT_FOUND;
            response.send('Not Found');
        }

        const responseString = response.end();
        socket.write(responseString);
        socket.end();
    });
});

module.exports = { server, route: router.addRoute.bind(router) };