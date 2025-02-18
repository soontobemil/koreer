// repositories/post.repository.js
const db = require('../../models');
const { getSubQuery } = require('@common/utils');

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

    async findToday(date,data) {
        return await db.NewsLetter.findAll( {
            where: { 
                send_date: date,
                category: {
                    [db.Op.in]: db.sequelize.literal(getSubQuery(data.cols, data.tbl, data.where))  // 조건 추가
                  }
            },
            attributes: [
                'category',
                'title',  // 다른 컬럼도 포함
                'content', // 다른 컬럼도 포함
                [db.Sequelize.fn('COUNT', db.Sequelize.col('category')), 'category_count']  // 카테고리별 갯수
              ],
            group: ['category', 'title', 'content'],  // 'category'를 기준으로 그룹화
            raw: true  // raw 데이터를 반환
        });
    }
}

module.exports = new AdminNewsLetterRepository();
