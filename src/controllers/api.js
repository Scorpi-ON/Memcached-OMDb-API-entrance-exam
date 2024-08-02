const axios = require('axios');
const ApiCache = require('../apicache/apicache')

const API_URL = process.env.API_URL;

async function getData(req, res) {
    try {
        const api_res = await axios.get(API_URL, { params: req.query });
        res.send(api_res.data);
    } catch (error) {
        if (!error.response) {
            res.status(500).json({ error: 'Internal server error when executing the request' });
            console.log('Ошибка в коде приложения: ', error);
            return;
        }
        res.status(error.response.status).json(error.response.data);
        console.log(
            `Ошибка ${error.response.status} при выполнении ${error.request.method}-запроса ${error.request.res.responseUrl}:`,
            error.response.data
        );
    }
}

function deleteItem(req, res) {
    const { itemToDelete } = req.body;
    res.json({ test: ApiCache.clear(itemToDelete) });
}

async function updateItem(req, res) {
    const { itemToUpdate } = req.body;
    const api_res = await axios.get(API_URL, { params: req.query });
}

module.exports = {
    getData,
    deleteItem,
    updateItem
};
