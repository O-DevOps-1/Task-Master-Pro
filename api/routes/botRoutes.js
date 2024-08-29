const express = require('express');
const { interactWithBot } = require('../controllers/botController');
const router = express.Router();

router.post('/interact', interactWithBot);

module.exports = router;
