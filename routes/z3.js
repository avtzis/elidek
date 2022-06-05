const express = require('express');
const z3Controller = require('../controllers/z3');

const router = express.Router();

router.get('/:id', z3Controller.getz3);

module.exports = router;