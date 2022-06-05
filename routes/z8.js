const express = require('express');
const z8Controller = require('../controllers/z8');

const router = express.Router();

router.get('/', z8Controller.getz8);

module.exports = router;