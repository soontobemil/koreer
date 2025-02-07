// repositories/post.repository.js
const db = require('../../models');
const {Op} = require("sequelize");

class AdminComInfoRepository {
    async create(data) {
        try {
          const info = await db.CompanyInfo.create(data);
          return info;
        } catch (error) {
          console.log(error);
          throw new Error('Error creating info');
        }
    }
    async getInfos(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {company_name: {[Op.like]: `%${searchWord}%`}},
                        {location: {[Op.like]: `%${searchWord}%`}},
                        {area: {[Op.like]: `%${searchWord}%`}},
                        {country: {[Op.like]: `%${searchWord}%`}},
                        {industry: {[Op.like]: `%${searchWord}%`}},
                        {industry_detail: {[Op.like]: `%${searchWord}%`}}
                    ]
                };
            }

            const {rows, count} = await db.CompanyInfo.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['updated_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching company infos with pagination:', error);
            throw new Error('Error fetching company infos with pagination');
        }
    }

    async findById(id) {
        return await db.CompanyInfo.findOne( {where: { id } });
    }

    async update(id, updateData) {
        return await db.CompanyInfo.update(updateData, {where: {id}});
    }

    async delete(id) {
        return await db.CompanyInfo.destroy({where: {id}});
    }
}

module.exports = new AdminComInfoRepository();
