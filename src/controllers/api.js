const axios = require('axios');
const apiService = require('../services/api')
const {ApiCache} = require('../services/cache')
const errors = require('../utils/commonErrors');

async function getData(req, res) {
    try {
        const api_res = await axios.get(process.env.API_URL, { params: req.query });
        const status = ApiCache.isFull ? 207 : 200;
        res.status(status).send(api_res.data);
    } catch (error) {
        if (!error.response) {
            errors.serverError(res, error)
        } else {
            res.status(error.response.status).json(error.response.data);
            console.log(
                `Ошибка ${error.response.status} при выполнении GET-запроса ${error.request.res.responseUrl}:`,
                error.response.data
            );
        }
    }
}

function deleteItem(req, res) {
    try {
        const itemToDelete = req.sortedOriginalUrl();
        const success = apiService.deleteItem(itemToDelete)
        if (success) {
            res.json({ message: itemToDelete + ' successfully deleted from the cache' });
        } else {
            res.status(404).json({ message: itemToDelete + ' is not cached, nothing to delete' });
        }
    } catch (error) {
        errors.serverError(res, error)
    }
}

async function updateItem(req, res) {
    let itemToUpdate;
    try {
        itemToUpdate = req.sortedOriginalUrl();
        const cacheUrl = `${req.protocol}://${req.headers['host']}`;
        const success = await apiService.updateItem(itemToUpdate, cacheUrl);
        if (success) {
            res.json({ message: itemToUpdate + ' successfully updated' });
        } else {
            res.status(404).json({ message: itemToUpdate + ' is not cached, nothing to update' });
        }
    } catch (error) {
        if (!error.response) {
            errors.serverError(res, error)
        } else if (error.response.status === 401) {
            res.json({ message: itemToUpdate + ' successfully updated' });
        } else {
            res.status(error.response.status).json(error.response.data);
            console.log(
                `Ошибка ${error.response.status} при выполнении ${error.request.method}-запроса ${error.request.res.responseUrl}:`,
                error.response.data
            );
        }
    }
}

module.exports = {
    getData,
    deleteItem,
    updateItem
};
