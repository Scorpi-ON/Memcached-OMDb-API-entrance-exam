const express = require('express');
const router = express.Router();
const apiController = require('../controllers/api');
const apicache = require("apicache");

const cache = apicache.middleware;

router.get('/', cache(), apiController.getData)

module.exports = router;
