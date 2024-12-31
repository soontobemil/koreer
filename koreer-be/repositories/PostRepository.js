// repositories/post.repository.js
const db = require('../models');

class PostRepository {
    async create(postData) {
        return await db.Post.create(postData);
    }

    async findById(id) {
        return await db.Post.findOne({ where: { id } });
    }

    async getPostsWithPagination(offset, limit) {
        try {
          // 전체 게시글 수와 페이징 처리된 게시글 가져오기
          const { rows, count } = await db.Post.findAndCountAll({
            offset, // 건너뛸 데이터 수
            limit,  // 가져올 데이터 수
            order: [['created_at', 'DESC']], // 최신순 정렬
          });
          return { rows, count };
        } catch (error) {
          console.error('Error fetching posts with pagination:', error);
          throw new Error('Error fetching posts with pagination');
        }
    }

    async update(id, updateData) {
        return await db.Post.update(updateData, { where: { id } });
    }

    async delete(id) {
        return await db.Post.destroy({ where: { id } });
    }

    async incrementViewCnt({ by, id }) {
        return await db.Post.increment('view_count', { by: by, where: { id } });
    }
}

module.exports = new PostRepository();
