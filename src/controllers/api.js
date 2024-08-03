const axios = require('axios');
const ApiCache = require('../apicache/apicache')

async function getData(req, res) {
    try {
        const api_res = await axios.get(process.env.API_URL, { params: req.query });
        res.send(api_res.data);
    } catch (error) {
        if (!error.response) {
            res.status(500).json({ error: 'Internal server error' });
            console.log('Ошибка в коде приложения: ', error);
            return;
        }
        res.status(error.response.status).json(error.response.data);
        console.log(
            `Ошибка ${error.response.status} при выполнении GET-запроса ${error.request.res.responseUrl}:`,
            error.response.data
        );
    }
}

function deleteItem(req, res) {
    try {
        const itemToDelete = req.originalUrl;
        if (ApiCache.items.includes(itemToDelete)) {
            ApiCache.clear(itemToDelete)
            res.json({ message: itemToDelete + ' successfully deleted from the cache' });
        } else {
            res.status(404).json({ message: itemToDelete + ' is not cached, nothing to delete' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
        console.log('Ошибка в коде приложения: ', error);
    }
}

async function updateItem(req, res) {
    let itemToUpdate;
    try {
        itemToUpdate = req.originalUrl;
        if (ApiCache.items.includes(itemToUpdate)) {
            ApiCache.clear(itemToUpdate)
            const requestUrl = `${req.protocol}://${req.host}:${process.env.PORT}${req.originalUrl}`;
            await axios.get(requestUrl);
            res.json({ message: itemToUpdate + ' successfully updated' });
        } else {
            res.status(404).json({ message: itemToUpdate + ' is not cached, nothing to update' });
        }
    } catch (error) {
        if (!error.response) {
            res.status(500).json({ error: 'Internal server error' });
            console.log('Ошибка в коде приложения: ', error);
            return;
        }
        if (error.response.status === 401) {
            res.json({ message: itemToUpdate + ' successfully updated' });
            return;
        }
        res.status(error.response.status).json(error.response.data);
        console.log(
            `Ошибка ${error.response.status} при выполнении ${error.request.method}-запроса ${error.request.res.responseUrl}:`,
            error.response.data
        );
    }
}

module.exports = {
    getData,
    deleteItem,
    updateItem
};
