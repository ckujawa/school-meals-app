const express = require('express');
const router = express.Router();
const appDataController = require('../controllers/appDataController');
const adminController = require('../controllers/adminController')
const {catchErrors} = require('../handlers/errorHandlers')

router.post('/submit', appDataController.createAppData);
router.get('/getNewApps', catchErrors(appDataController.getNewApps));
router.get('/markProcessed/:appId', catchErrors(appDataController.markProcessed));

router.get('/admin', adminController.loginForm)

module.exports = router;