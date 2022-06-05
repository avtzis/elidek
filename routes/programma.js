const express = require('express');
const programmaController = require('../controllers/programma');

const router = express.Router();

router.get('/', programmaController.getProgrammata);
router.post('/create', programmaController.postProgramma);
router.get('/creation-page', programmaController.getCreateProgramma);
router.post('/update/:id', programmaController.postUpdateProgramma);
router.post('/delete/:id', programmaController.postDeleteProgramma);

module.exports = router;