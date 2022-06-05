const express = require('express');
const z22Controller = require('../controllers/z22');

const router = express.Router();

router.get('/', z22Controller.getz22);

module.exports = router;