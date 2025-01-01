const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const passport = require('passport');

/* GET */
router.post('/login', authController.login);

router.post('/logout', authController.logout);

router.post('/register', authController.register);

router.post('/token', authController.refreshAccessToken);

router.get('/verify-email/:token', authController.emailVefify);

router.get('/google/callback', authController.googleCallBack)

router.get('/google/login', authController.googleLogin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
