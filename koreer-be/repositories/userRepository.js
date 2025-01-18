const {User} = require('../models');

class UserRepository {

    async update(updateData, options) {
        try {
            return await User.update(updateData, options);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserRepository();