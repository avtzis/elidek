const express = require('express');
const z5Controller = require('../controllers/z5');

const router = express.Router();

router.get('/', z5Controller.getz5);

module.exports = router;