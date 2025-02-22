const {User} = require('../models');

class UserRepository {

    async update(updateData, options) {
        try {
            return await User.update(updateData, options);
        } catch (error) {
            throw error;
        }
    }

    async updateUserAsAuthUser(userId) {
        try {
            return await User.update(
                { role: 'auth_user' },
                {
                    where: { id: userId }  // 조건
                }
            );
        } catch (error) {
            console.error('인증 유저 업데이트 에러:', error);
            throw error;
        }
    }
}

module.exports = new UserRepository();