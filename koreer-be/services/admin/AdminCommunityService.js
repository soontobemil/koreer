// services/post.service.js
const AdminCommunityRepository = require('../../repositories/admin/AdminCommunityRepository');
const { CreatePostDTO, PostResponseDTO, PostDTO } = require('../../dtos/PostDTO');
const { redisClient } = require('../../config/redisClient'); // 전역 Redis 클라이언트 사용

class AdminCommunityService {
    async getPostById(id, user_id) {
        const post = await AdminCommunityRepository.searchPostById(id);
        if (!post) {
            throw new Error('Post not found');
        }

        return new PostDTO(post);
    }

    async getPosts(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;
            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: posts, count: total } = await AdminCommunityRepository.getPosts(offset, limit, req);

            if (!posts.length) {
                return {
                    data: [],
                    meta: {
                        total,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    },
                };
            }
            
            // ✅ Redis에서 조회수 가져오기 (MGET 사용으로 최적화)
            const postIds = posts.map(post => `post:${post.id}:views`);
            const viewCounts = await redisClient.mget(postIds);

            const postsDTO = posts.map((post, index) => {
                const isOwner = true; // 현재 사용자와 작성자 비교
                const postObject = post.toJSON ? post.toJSON() : post; // Sequelize 객체 변환
                const redisViews = viewCounts[index] ? parseInt(viewCounts[index], 10) : 0; // 조회수 가져오기
                return new PostResponseDTO({ ...postObject, is_owner: isOwner, view_count: post.view_count + redisViews });
            });

            // 페이지네이션 메타데이터 포함 응답
            return {
                data: postsDTO,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Error fetching posts');
        }
    }

    async updatePost(id, updateData) {
        if(updateData.title && updateData.content) {
            updateData = {title:updateData.title,content:updateData.content};
        } else {
            throw new Error('제목과 내용이 존재하지 않습니다.');
        }
        const [updated] = await AdminCommunityRepository.updatePost(id, updateData);
        if (!updated) {
            throw new Error('Post not found or update failed');
        }
        const updatedPost = await AdminCommunityRepository.searchPostById(id);
        return new PostResponseDTO(updatedPost);
    }

    async deletePost(id) {
        const deleted = await AdminCommunityRepository.deletePost(id);
        if (!deleted) {
            throw new Error('Post not found or delete failed');
        }

        // 캐시 무효화 메시지 전송
        await redisClient.publish('CACHE_INVALIDATION', `post:${id}:views`);

        return { message: 'Post deleted successfully' };
    }
}

module.exports = new AdminCommunityService();
