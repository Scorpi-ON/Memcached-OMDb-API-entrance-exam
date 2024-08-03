const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const ApiCache = require('../apicache/apicache');
const redirectToDocsIfNoParams = require('../utils/redirectToDocs')

router.get('/', redirectToDocsIfNoParams, ApiCache.middleware, apiController.getData);
router.put('/', apiController.updateItem)
router.delete('/', apiController.deleteItem)

module.exports = router;
