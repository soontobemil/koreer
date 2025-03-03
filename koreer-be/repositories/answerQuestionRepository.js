const { AnswerQuestion, Post } = require('../models');

class AnswerQuestionRepository {
    /**
     * 답변 생성
     */
    async createAnswer(answerData) {
        return await AnswerQuestion.create(answerData);
    }

    /**
     * ID로 답변 조회
     */
    async findAnswerById(id) {
        return await AnswerQuestion.findByPk(id);
    }

    /**
     * 게시물 ID로 모든 답변을 조회
     */
    async findAnswersByPostId(postId) {
        return await AnswerQuestion.findAll({
            where: { post_id: postId },
            order: [['created_at', 'DESC']]
        });
    }

    /**
     * 사용자 ID로 모든 답변을 조회
     */
    async findAnswersByUserId(userId) {
        return await AnswerQuestion.findAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']]
        });
    }

    /**
     * 사용자 ID + 게시물 ID로 답변 조회
     */
    async findAnswerByPostIdAndUserId(postId, userId) {
        return await AnswerQuestion.findOne({
            where: {
                post_id: postId,
                user_id: userId
            },
            order: [['created_at', 'DESC']]
        });
    }

    async findAndCountAnswersByUserId(userId, offset, limit) {
        return await AnswerQuestion.findAndCountAll({
            where: { user_id: userId },
            order: [['created_at', 'DESC']],
            offset,
            limit,
            distinct: true // 정확한 count를 위해 distinct 사용
        });
    }

    /**
     * 게시물 ID로 게시물을 조회
     */
    async findPostById(postId) {
        return await Post.findByPk(postId);
    }
}

module.exports = new AnswerQuestionRepository();