// repositories/post.repository.js
const db = require('../../models');

class AdminNewsLetterRepository {
    async create(data) {
        try {
          const letter = await db.NewsLetter.create(data);
          return letter;
        } catch (error) {
          console.log(error);
          throw new Error('Error creating news letter');
        }
    }
    async getNewsLetters(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [db.Op.or]: [
                        {title: {[db.Op.like]: `%${searchWord}%`}},
                        {content: {[db.Op.like]: `%${searchWord}%`}},
                    ]
                };
            }

            const {rows, count} = await db.NewsLetter.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['updated_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching newsletters with pagination:', error);
            throw new Error('Error fetching newsletters with pagination');
        }
    }

    async findById(id) {
        return await db.NewsLetter.findOne( {where: { id } });
    }

    async update(id, updateData) {
        return await db.NewsLetter.update(updateData, {where: {id}});
    }

    async delete(id) {
        return await db.NewsLetter.destroy({where: {id}});
    }

    async findToday(date) {
        return await db.NewsLetter.findOne( {where: { send_date: date },order: [['updated_at', 'DESC']] });
    }
}

module.exports = new AdminNewsLetterRepository();
