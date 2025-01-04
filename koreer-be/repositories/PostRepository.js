// repositories/post.repository.js
const db = require('../models');
const {Op} = require("sequelize");

class PostRepository {
    async create(postData) {
        return await db.Post.create(postData);
    }

    async searchById(id) {
        return await db.Post.findOne({
            where: { id },
            include: [{
                model: db.Comment,
                as: 'comments',
                attributes: ['id', 'content', 'user_email', 'created_at']
            }],
            attributes: {
                include: [
                    [
                        db.sequelize.literal(`(
                        SELECT username
                        FROM "users" 
                        WHERE "users"."user_email" = "Post"."user_email"
                        LIMIT 1
                    )`),
                        'username'
                    ]
                ]
            }
        });
    }

    async findById(id) {
        return await db.Post.findOne({
            where: { id },
            attributes: {
                include: [
                    [
                        db.sequelize.literal(`(
                        SELECT username
                        FROM "users" 
                        WHERE "users"."user_email" = "Post"."user_email"
                        LIMIT 1
                    )`),
                        'username'
                    ]
                ]
            },
        });
    }

    async getPosts(offset, limit, req) {
        try {
            const type = req.query.type || undefined;
            const searchWord = req.query.searchWord || undefined;

            let whereCondition = {};

            // type 파라미터가 있으면 조건에 추가
            if (type !== undefined && type !== null && type !== '') {
                whereCondition.category = type;
            }

            if (searchWord !== undefined && searchWord !== null && searchWord !== '') {
                whereCondition = {
                    ...whereCondition,
                    [Op.or]: [
                        {title: {[Op.like]: `%${searchWord}%`}},
                        {content: {[Op.like]: `%${searchWord}%`}}
                    ]
                };
            }

            // 전체 게시글 수와 페이징 처리된 게시글 가져오기
            const getUserSubQuery = (field) => [
                db.sequelize.literal(`(
                   SELECT ${field}
                   FROM "users" 
                   WHERE "users"."user_email" = "Post"."user_email"
                   LIMIT 1
               )`),
                field
            ];

            const {rows, count} = await db.Post.findAndCountAll({
                attributes: {
                    include: [
                        getUserSubQuery('username'),
                        getUserSubQuery('nation')
                    ]
                },
                where: whereCondition,
                offset,
                limit,
                order: [['created_at', 'DESC']],
                distinct: true
            });

            return {rows, count};
        } catch (error) {
            console.error('Error fetching posts with pagination:', error);
            throw new Error('Error fetching posts with pagination');
        }
    }

    async update(id, updateData) {
        return await db.Post.update(updateData, {where: {id}});
    }

    async delete(id) {
        return await db.Post.destroy({where: {id}});
    }

    async incrementViewCnt({ by, id }) {
        return await db.Post.increment('view_count', { by: by, where: { id } });
    }
}

module.exports = new PostRepository();
