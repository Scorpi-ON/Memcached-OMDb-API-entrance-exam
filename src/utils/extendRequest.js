const {IncomingMessage} = require("node:http");

Object.defineProperty(IncomingMessage.prototype, "sortedOriginalUrl", {
    value: function () {
        const sortedKeys = Object.keys(this.query).sort();
        const sortedParams = sortedKeys.map(
            key => `${key}=${this.query[key]}`
        ).join('&');
        return `${this.baseUrl}?${sortedParams}`;
    },
});
