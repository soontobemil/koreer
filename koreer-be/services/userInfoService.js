// services/userInfoService.js
const userInfoRepository = require('../repositories/userInfoRepository');

class UserInfoService {
    async createUserInfo(userInfoData) {
        try {
            const formattedData = {
                ...userInfoData,
                skills: JSON.stringify(userInfoData.skills || []),
                interests: JSON.stringify(userInfoData.interests || []),
                github_url: userInfoData.github_url || null,
                portfolio_url: userInfoData.portfolio_url || null,
            };

            const userInfo = await userInfoRepository.create(formattedData);
            return userInfo;
        } catch (error) {
            throw error;
        }
    }

    validateUserInfoData(data) {
        const requiredFields = [
            'school',
            'major',
            'graduation_year',
            'location',
            'desired_country',
            'introduction',
            'user_id'
        ];

        for (const field of requiredFields) {
            if (!data[field]) {
                throw new Error(`${field} is required`);
            }
        }

        return true;
    }
}

module.exports = new UserInfoService();