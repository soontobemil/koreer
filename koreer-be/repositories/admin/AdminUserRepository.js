// repositories/post.repository.js
const db = require('../../models');
const {Op} = require("sequelize");

class AdminUserRepository {
    async getUsers(offset, limit, req) {
        try {
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {id: {[Op.like]: `%${searchWord}%`}},
                        {user_email: {[Op.like]: `%${searchWord}%`}}
                    ]
                };
            }

            const {rows, count} = await db.User.findAndCountAll({
                where: whereCondition,
                offset,
                limit,
                order: [['created_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching users with pagination:', error);
            throw new Error('Error fetching users with pagination');
        }
    }
    async getUserByCondition(req) {
        try {
            //const searchWord = req.query.searchWord || undefined;req.params.id
            const id = req.params.id || undefined;

            let whereCondition = {};

            if (id !== undefined && id !== null && id !== '') {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {id: id},
                        {user_email: {[Op.like]: `%${id}%`}}
                    ]
                };
            }

            const user = await db.User.findOne({
                attributes: {
                    include: [
                        // user_info의 모든 필드를 JSON 형태로 가져오기
                        //[db.sequelize.literal(`row_to_json("user_info")`), 'user_info']
                        [db.sequelize.literal(`row_to_json("userInfo")`), 'userInfo'] // userInfo를 JSON으로 변환
                    ]
                },
                include: [
                    {
                        model: db.UserInfo, // user_info 테이블의 모델
                        //as: 'user_info',    // alias 설정
                        as: 'userInfo',    // alias 설정
                        attributes: { exclude: [] } // 모든 필드 포함
                    }
                ],
                where: whereCondition,
                order: [['created_at', 'DESC']],
                distinct: true
            });

            return user;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    }
}

module.exports = new AdminUserRepository();
