const express = require('express');
const router = express.Router();
const appDataController = require('../controllers/appDataController');

router.post('/submit', appDataController.createAppData);
router.get('/getNewApps', appDataController.getNewAppData);

module.exports = router;