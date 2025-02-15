// repositories/post.repository.js
const db = require('../../models');
const {Op} = require("sequelize");

class AdminCommCodeRepository {
    async createCode(data) {
        try {
            const code = await db.CommonCode.create(data);
            return code;
        } catch (error) {
          console.log(error);
          throw new Error('Error creating code');
        }
    }
    async getCodes(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {group_code_name: {[Op.like]: `%${searchWord}%`}},
                        {code_name: {[Op.like]: `%${searchWord}%`}},
                        {group_code: {[Op.like]: `%${searchWord}%`}},
                        {code: {[Op.like]: `%${searchWord}%`}}
                    ]
                };
            }

            const {rows, count} = await db.CommonCode.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['group_code', 'ASC'],['sort_order', 'ASC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching codes with pagination:', error);
            throw new Error('Error fetching codes with pagination');
        }
    }
    async getCodeByGroupCode(req) {
        try {
            const groupCode = req.params.groupCode || undefined;

            const codes = await db.CommonCode.findAll({
                where: { group_code: groupCode},
                order: [['sort_order', 'ASC']],
                distinct: true
            });

            return codes;
        } catch (error) {
            console.error('Error fetching codes:', error);
            throw new Error('Error fetching codes');
        }
    }

    async updateCode(id, updateData) {

        return await db.CommonCode.update(updateData, {where: {id}});
    }

    async findById(id) {
        return await db.CommonCode.findOne( {where: { id } });
    }

    async delete(id) {
        return await db.CommonCode.destroy({where: {id}});
    }
}

module.exports = new AdminCommCodeRepository();
