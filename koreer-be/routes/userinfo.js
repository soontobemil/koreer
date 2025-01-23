const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');
// const authMiddleware = require('../middlewares/authMiddleware'); // JWT 인증 미들웨어

// router.use(authMiddleware);

// UserInfo CRUD 라우트
router.post('/', userInfoController.createUserInfo);
router.get('/:id', userInfoController.getCurrentUserInfo);
router.put('/', userInfoController.updateUserInfo);

module.exports = router;