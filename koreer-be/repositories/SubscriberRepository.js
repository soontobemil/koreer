// repositories/userInfoRepository.js
const db = require('../models');

class SubscriberRepository {
    async create(data) {
        try {
            return await db.Subscriber.create(data);
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            return await db.Subscriber.findOne({where: {user_email: email}});
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        return await db.Subscriber.destroy({where: {id}});
    }

}

module.exports = new SubscriberRepository();