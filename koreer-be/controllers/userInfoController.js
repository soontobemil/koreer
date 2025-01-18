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
    },

    async getCurrentUserInfo(req, res) {
        try {
            const userId = req.params.id;
            const userInfo = await userInfoService.getCurrentUserInfo(userId);

            return res.status(200).json({
                status: 'success',
                message: '유저 정보를 성공적으로 조회했습니다.',
                data: userInfo
            });
        } catch (error) {
            return res.status(500).json({
                status: 'error',
                message: error.message || '유저 정보 조회 중 오류가 발생했습니다.'
            });
        }
    }
};

module.exports = userInfoController;