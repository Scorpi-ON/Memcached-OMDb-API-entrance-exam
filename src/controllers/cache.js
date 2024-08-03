const {ApiCache} = require('../services/cache');
const errors = require('../utils/commonErrors');

function getStats(req, res) {
    try {
        res.json({
            size: ApiCache.size,
            items: ApiCache.items
        });
    } catch (error) {
        errors.serverError(res, error)
    }
}

function getMaxSize (req, res) {
    try {
        res.json({ max_cache_size: ApiCache.maxSize })
    } catch (error) {
        errors.serverError(res, error)
    }
}

function setMaxSize (req, res) {
    try {
        const value = req.query.value
        ApiCache.maxSize = value;
        res.json({ message: `Max cache size set to ${value}` });
    } catch (error) {
        if (error.message.includes('cache size')) {
            res.status(400).json({ error: error.message })
        } else {
            errors.serverError(res, error)
        }
    }
}

function clear (req, res) {
    try {
        ApiCache.clear();
        res.json({ message: 'Cache cleared successfully' });
    } catch (error) {
        errors.serverError(res, error)
    }
}

module.exports = {
    getStats,
    getMaxSize,
    setMaxSize,
    clear
};
