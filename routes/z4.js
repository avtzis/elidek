const express = require('express');
const z4Controller = require('../controllers/z4');

const router = express.Router();

router.get('/', z4Controller.getz4);

module.exports = router;