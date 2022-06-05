const express = require('express');
const z2Controller = require('../controllers/z2');

const router = express.Router();

router.get('/', z2Controller.getz2);

module.exports = router;