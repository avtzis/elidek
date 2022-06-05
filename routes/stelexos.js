const express = require('express');
const stelexosController = require('../controllers/stelexos');

const router = express.Router();

router.get('/', stelexosController.getStelexi);
router.post('/create', stelexosController.postStelexo);
router.get('/creation-page', stelexosController.getCreateStelexo);
router.post('/update/:id', stelexosController.postUpdateStelexo);
router.post('/delete/:id', stelexosController.postDeleteStelexo);

module.exports = router;