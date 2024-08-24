const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

/* GET */
router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/register', authController.register);

router.post('/token', authController.refreshAccessToken);

module.exports = router;
