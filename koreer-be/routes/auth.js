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

router.get('/google/callback', passport.authenticate('google', { session: false,failureRedirect: '/',
      successRedirect:'http://localhost:3001/some-page' }),  // 인증 실패 시 리디렉션
(req, res) => {
  // 인증 성공 시 사용자 정보 반환
  res.json({
    message: 'Login successful',
    user: req.user,  // req.user에 사용자 정보가 저장됨
  });
});

router.get('/google/login', authController.googleLogin);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

module.exports = router;
