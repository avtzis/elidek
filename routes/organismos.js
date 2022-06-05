const express = require('express');
const organismosController = require('../controllers/organismos');

const router = express.Router();

router.get('/', organismosController.getOrganismous);
router.post('/create', organismosController.postOrganismo);
router.get('/creation-page', organismosController.getCreateOrganismo);
router.post('/update/:id', organismosController.postUpdateOrganismo);
router.post('/delete/:id', organismosController.postDeleteOrganismo);

module.exports = router;