const express = require('express');
const router = express.Router();
const cacheController = require('../controllers/cache');

router.get('/', cacheController.getStats);
router.get('/maxsize', cacheController.getMaxSize);
router.put('/maxsize', cacheController.setMaxSize);
router.patch('/clear', cacheController.clear);

module.exports = router;
