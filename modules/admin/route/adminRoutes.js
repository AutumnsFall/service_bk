const express = require('express');
const router = express.Router();
const apiLimiter = require('../../../config/apiLimiter');
const AdminController = require('../controller/adminController');

router.post('/auth', apiLimiter.authRateLimit, AdminController.auth);
router.post('/register', AdminController.register);

module.exports = router;