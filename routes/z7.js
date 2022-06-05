const express = require('express');
const z7Controller = require('../controllers/z7');

const router = express.Router();

router.get('/', z7Controller.getz7);

module.exports = router;