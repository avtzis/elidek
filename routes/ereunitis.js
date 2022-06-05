const express = require('express');
const ereunitisController = require('../controllers/ereunitis');

const router = express.Router();

router.get('/', ereunitisController.getEreunites);
router.post('/create', ereunitisController.postEreuniti);
router.get('/creation-page', ereunitisController.getCreateEreuniti);
router.post('/update/:id', ereunitisController.postUpdateEreuniti);
router.post('/delete/:id', ereunitisController.postDeleteEreuniti);

module.exports = router;