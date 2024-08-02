const ApiCache = require('../apicache/apicache');

function getStats(req, res) {
    res.json({
        size: ApiCache.size,
        items: ApiCache.items
    });
}

function getMaxSize (req, res) {
    res.json({ max_cache_size: ApiCache.maxSize })
}

function setMaxSize (req, res) {
    const { new_size } = req.body;
    try {
        ApiCache.maxSize = new_size;
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
    res.json({ message: `Cache max size set to ${new_size}` });
}

function clear (req, res) {
    ApiCache.clear();
    res.json({ message: 'Cache cleared successfully' });
}

module.exports = {
    getStats,
    getMaxSize,
    setMaxSize,
    clear
};
