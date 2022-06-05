const express = require('express');
const paradoteoController = require('../controllers/paradoteo');

const router = express.Router();

router.get('/', paradoteoController.getParadotea);
router.post('/create', paradoteoController.postParadoteo);
router.get('/creation-page', paradoteoController.getCreateParadoteo);
router.post('/update/:id', paradoteoController.postUpdateParadoteo);
router.post('/delete/:id', paradoteoController.postDeleteParadoteo);

module.exports = router;