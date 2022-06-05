const express = require('express');
const ergoController = require('../controllers/ergo');

const router = express.Router();

router.get('/', ergoController.getErga);
router.post('/create', ergoController.postErgo);
router.get('/creation-page', ergoController.getCreateErgo);
router.post('/update/:id', ergoController.postUpdateErgo);
router.post('/delete/:id', ergoController.postDeleteErgo);

module.exports = router;