'use strict';

const CRLF = '\r\n';
const HEADER_BODY_SEPARATOR = '';
const COOKIE_SEPARATOR = '; ';
const COOKIE_ASSIGNMENT = '=';

function request(data) {
    const lines = data.toString().split(CRLF);
    const [method, path] = lines.shift().split(' ');
    const separatorIndex = lines.findIndex(line => line === HEADER_BODY_SEPARATOR);

    const headers = lines.slice(0, separatorIndex).reduce((headers, line) => {
        const [key, value] = line.split(': ');
        headers[key] = value;
        return headers;
    }, {});

    const body = lines.slice(separatorIndex + 1).join(CRLF);
    return { method, path, headers, body };
}

function cookies(headers) {
    const cookiesHeader = headers['Cookie'] || headers['cookie'];
    if (!cookiesHeader) return {};

    return cookiesHeader.split(COOKIE_SEPARATOR).reduce((parsedCookies, cookie) => {

        const [key, value] = cookie.split(COOKIE_ASSIGNMENT);
        parsedCookies[key] = value;
        return parsedCookies;
    }, {});
}

module.exports = { request, cookies };