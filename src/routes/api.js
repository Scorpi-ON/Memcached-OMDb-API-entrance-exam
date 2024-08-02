const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const ApiCache = require('../apicache/apicache');

const cache = ApiCache.middleware;

router.get('/', cache(), apiController.getData);
router.patch('/', apiController.updateItem)
router.delete('/', apiController.deleteItem)

module.exports = router;
