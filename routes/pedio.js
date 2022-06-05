const express = require('express');
const pedioController = require('../controllers/pedio');

const router = express.Router();

router.get('/', pedioController.getPedia);
router.post('/create', pedioController.postPedio);
router.get('/creation-page', pedioController.getCreatePedio);
router.post('/update/:id', pedioController.postUpdatePedio);
router.post('/delete/:id', pedioController.postDeletePedio);

module.exports = router;