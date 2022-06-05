const express = require('express');
const z6Controller = require('../controllers/z6');

const router = express.Router();

router.get('/', z6Controller.getz6);

module.exports = router;