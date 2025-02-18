// repositories/post.repository.js
const db = require('../../models');
const {Op} = require("sequelize");

class AdminSubscriberRepository {
    async findById(id) {
        return await db.Subscriber.findOne({where: { id }});
    }

    async getSubscribers(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {user_email: {[Op.like]: `%${searchWord}%`}}
                    ]
                };
            }

            const {rows, count} = await db.Subscriber.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['created_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching subscribers with pagination:', error);
            throw new Error('Error fetching subscribers with pagination');
        }
    }

    async delete(id) {
        return await db.Subscriber.destroy({where: {id}});
    }

    async getAllSubscribers(category) {
        return await db.Subscriber.findAll({where:{category:category}});
    }

}

module.exports = new AdminSubscriberRepository();
