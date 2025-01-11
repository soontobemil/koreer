// controllers/userInfoController.js
const userInfoService = require('../services/userInfoService');

const userInfoController = {
    createUserInfo: async (req, res) => {
        try {
            // 데이터 유효성 검증
            userInfoService.validateUserInfoData(req.body);

            // UserInfo 생성
            const userInfo = await userInfoService.createUserInfo(req.body);

            res.status(201).json({
                success: true,
                data: userInfo
            });

        } catch (error) {
            console.error('Error creating user info:', error);

            // 유효성 검증 실패
            if (error.message.includes('required')) {
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            // 서버 에러
            res.status(500).json({
                success: false,
                message: '서버 에러가 발생했습니다.',
                error: error.message
            });
        }
    }
};

module.exports = userInfoController;