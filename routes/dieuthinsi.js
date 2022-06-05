const express = require('express');
const dieuthinsiController = require('../controllers/dieuthinsi');

const router = express.Router();

router.get('/', dieuthinsiController.getDieuthinseis);
router.post('/create', dieuthinsiController.postDieuthinsi);
router.get('/creation-page', dieuthinsiController.getCreateDieuthinsi);
router.post('/update/:id', dieuthinsiController.postUpdateDieuthinsi);
router.post('/delete/:id', dieuthinsiController.postDeleteDieuthinsi);

module.exports = router;