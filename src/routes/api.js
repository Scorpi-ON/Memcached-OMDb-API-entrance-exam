const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const ApiCache = require('../apicache/apicache');

const cache = ApiCache.middleware;

function redirectToDocsIfNoParams (req, res, next) {
    if (Object.keys(req.query).length > 0) {
        next();
    } else {
        res.set(
            'Warning',
            '299 - "To use the API you should pass at least one parameter. Redirecting to docs."'
        );
        res.redirect(308, '../docs');
    }
}

router.get('/', redirectToDocsIfNoParams, cache(), apiController.getData);
router.put('/', apiController.updateItem)
router.delete('/', apiController.deleteItem)

module.exports = router;
