// repositories/userInfoRepository.js
const {UserInfo} = require('../models');

class UserInfoRepository {
    async create(userInfoData) {
        try {
            return await UserInfo.create(userInfoData);
        } catch (error) {
            throw error;
        }
    }

    async findByUserId(userId) {
        try {
            return await UserInfo.findOne({where: {user_id: userId}});
        } catch (error) {
            throw error;
        }
    }

    async update(userId, updateData) {
        try {
            return await UserInfo.update(updateData, {
                where: {user_id: userId}
            });
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserInfoRepository();