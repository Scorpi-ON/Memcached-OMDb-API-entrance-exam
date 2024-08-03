const apicache = require('apicache');

class ApiCache {
    static _maxSize = 3;

    static middleware(req, res, next) {
        req.originalUrl = req.sortedOriginalUrl();
        apicache.middleware()(req, res, next);
    }

    static get items() {
        return apicache.getIndex()['all'];
    }

    static get size() {
        return this.items.length;
    }

    static get maxSize() {
        return this._maxSize;
    }

    static set maxSize(value) {
        value = parseInt(value)
        if (isNaN(value) || value < 1) {
            throw new Error('Invalid cache size');
        }
        if (value < this.size) {
            throw new Error(
                `The cache size you are trying to set (${value}) is less than current` +
                ` number of items in the cache (${this.size}). You must free up the cache first.`
            );
        }
        this._maxSize = value;
    }

    static clear(target = null)  {
        apicache.clear(target);
    }
}

module.exports = {
    ApiCache
};
