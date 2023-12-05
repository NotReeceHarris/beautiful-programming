'use strict';

module.exports = class Router {
    constructor() {
        this.routes = {};
    }

    addRoute(requestPath, callback) {
        if (typeof requestPath !== 'string' || typeof callback !== 'function') {
            throw new Error('Path must be a string and callback must be a function');
        }

        this.routes[requestPath] = callback;
    }

    findRoute(path) {
        if (typeof path !== 'string') {
            throw new Error('Path must be a string');
        }

        const callback = this.routes[path];
        return callback ? { path, callback, params: {} } : null;
    }
}