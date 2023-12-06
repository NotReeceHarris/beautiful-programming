'use strict';

const CRLF = '\r\n';

class generator {
    constructor() {
        this.statusCode = 200;
        this.headers = {
            'Content-Type': 'text/plain'
        };
        this.body = '';
    }

    send(body) {
        this.body = body;
    }

    html(body) {
        if (typeof body !== 'string') {
            throw new Error('Body must be a string');
        }
        this.headers['Content-Type'] = 'text/html';
        this.body = body;
    }

    json(body) {
        this.headers['Content-Type'] = 'application/json';
        this.body = JSON.stringify(body);
    }

    setCookie(key, value) {
        if (typeof key !== 'string' || typeof value !== 'string') {
            throw new Error('Key and value must be strings');
        }
        this.headers['Set-Cookie'] = `${key}=${value}`;
    }

    redirect(url) {
        if (typeof url !== 'string') {
            throw new Error('URL must be a string');
        }
        this.statusCode = 302;
        this.headers['Location'] = url;
    }

    end() {
        this.headers['Content-Length'] = this.body.length;
        this.headers['Date'] = new Date().toUTCString();
        this.headers['Connection'] = 'keep-alive';

        return `HTTP/1.1 ${this.statusCode}${CRLF}` +
            Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join(CRLF) +
            `${CRLF}${CRLF}${this.body}`;
    }
}

module.exports = { generator };