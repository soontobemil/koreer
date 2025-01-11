// repositories/userInfoRepository.js
const { UserInfo } = require('../models');

class UserInfoRepository {
    async create(userInfoData) {
        try {
            return await UserInfo.create(userInfoData);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserInfoRepository();