const ApiCache = require('../apicache/apicache');

function getStats(req, res) {
    try {
        res.json({
            size: ApiCache.size,
            items: ApiCache.items
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log('Ошибка в коде приложения: ', error);
    }
}

function getMaxSize (req, res) {
    try {
        res.json({ max_cache_size: ApiCache.maxSize })
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log('Ошибка в коде приложения: ', error);
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
            return;
        }
        res.status(500).json({ error: 'Internal server error' });
        console.log('Ошибка в коде приложения: ', error);
    }
}

function clear (req, res) {
    try {
        ApiCache.clear();
        res.json({ message: 'Cache cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log('Ошибка в коде приложения: ', error);
    }
}

module.exports = {
    getStats,
    getMaxSize,
    setMaxSize,
    clear
};
