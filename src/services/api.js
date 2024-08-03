const {ApiCache} = require("./cache");
const axios = require("axios");

function deleteItem(item) {
    if (ApiCache.items.includes(item)) {
        ApiCache.clear(item);
        return true;
    }
    return false;
}

async function updateItem(item, cacheUrl) {
    if (ApiCache.items.includes(item)) {
        ApiCache.clear(item)
        await axios.get(cacheUrl + item);
        return true;
    }
    return false;
}

module.exports = {
    deleteItem,
    updateItem
};