const db = require('../models');

class CommentRepository {
    async create(commentData) {
        return await db.Comment.create(commentData);
    }

    async findById(id) {
        return await db.Comment.findOne({ where: { id } });
    }

    async getComments(postId) {
        try {
          // 전체 게시글 수와 페이징 처리된 게시글 가져오기
          const comments = await db.Comment.findAndCountAll({
            where: {post_id:postId},
            order: [['created_at', 'DESC']], // 최신순 정렬
          });
          return comments;
        } catch (error) {
          console.error('Error fetching comments:', error);
          throw new Error('Error fetching comments with pagination');
        }
    }

    async update(id, updateData) {
        return await db.Comment.update(updateData, { where: { id } });
    }

    async delete(id) {
        return await db.Comment.destroy({ where: { id } });
    }
}

module.exports = new CommentRepository();
