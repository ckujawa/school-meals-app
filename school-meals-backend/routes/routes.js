const express = require('express');
const router = express.Router();
const appDataController = require('../controllers/appDataController');
const adminController = require('../controllers/adminController')

router.post('/submit', appDataController.createAppData);
router.get('/getNewApps', appDataController.getNewApps);

router.get('/admin', adminController.loginForm)

module.exports = router;