// services/post.service.js
const PostRepository = require('../repositories/PostRepository');
const { CreatePostDTO, PostResponseDTO, PostDTO } = require('../dtos/PostDTO');
const { redisClient } = require('../config/redisClient'); // 전역 Redis 클라이언트 사용
const jwt = require("jsonwebtoken");
const {getUserEmail} = require("../src/Auth");

class PostService {
    async createPost(req) {
        const email = getUserEmail(req)
        const data = req.body;

        const createPostDTO = new CreatePostDTO({
            user_email:email,
            title:data.title,
            content:data.content,
            category:data.category,
        }); // DTO 적용
        const post = await PostRepository.create(createPostDTO);
        return new PostResponseDTO(post); // DTO로 응답 생성
    }

    async getPostById(id, user_id) {
        const post = await PostRepository.searchById(id);
        if (!post) {
            throw new Error('Post not found');
        }

        // 작성자가 아닐때만 조회수 증가
        if(user_id && user_id !== post.user_id) {
            // ✅ 조회수 증가 후 업데이트된 값 가져오기
            await this.viewPost(post.id, user_id);
            const key = `post:${post.id}:views`;
            const updatedViews = (await redisClient.get(key)) || '0';
            if (updatedViews) {
                post.view_count = parseInt(post.view_count) + parseInt(updatedViews);
            }
        }
        
        return new PostDTO(post);
    }

    async viewPost(postId, userId) {
        try {
            const redisKey = `view:${postId}:${userId}`;
            
            // ✅ 중복 조회 방지 (조회 기록 있는 경우 무시)
            const isViewed = await redisClient.exists(redisKey);
            if (isViewed) {
                console.log(`User ${userId} already viewed post ${postId}`);
                return;
            }

            // ✅ 조회수 증가 처리: Redis에 조회 상태 저장 (3시간 TTL)
            await redisClient.set(redisKey, '1', 'EX', 10800); // 3시간 유지
            await redisClient.incr(`post:${postId}:views`); // Redis에 조회수 증가

            console.log(`✅ Post ${postId} viewed by user ${userId}`);
        } catch (error) {
            console.error('❌ Error in viewPost:', error);
            throw new Error('Unable to process viewPost');
        }
    }

    async getPosts(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;
            const currentUserEmail = getUserEmail(req)

            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: posts, count: total } = await PostRepository.getPosts(offset, limit, req);

            // PostResponseDTO로 매핑
            const postsDTO = posts.map(post => {
                const isOwner = post.user_email === currentUserEmail; // 현재 사용자와 작성자 비교
                const postObject = post.toJSON ? post.toJSON() : post; // Sequelize 객체일 경우 일반 객체로 변환
                return new PostResponseDTO({ ...postObject, is_owner: isOwner });
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
        const [updated] = await PostRepository.update(id, updateData);
        if (!updated) {
            throw new Error('Post not found or update failed');
        }
        const updatedPost = await PostRepository.findById(id);
        return new PostResponseDTO(updatedPost);
    }

    async deletePost(id) {
        const deleted = await PostRepository.delete(id);
        if (!deleted) {
            throw new Error('Post not found or delete failed');
        }

        // ✅ Redis에서 해당 게시글의 조회수 캐시 삭제
        await redisClient.del(`post:${id}:views`);

        return { message: 'Post deleted successfully' };
    }

    async syncViewsToDatabase() {
        try {
            let cursor = '0';
            do {
                // ✅ SCAN 명령어로 Redis에서 `post:*:views` 패턴 찾기 (최적화)
                const reply = await redisClient.scan(cursor, 'MATCH', 'post:*:views', 'COUNT', 100);
                cursor = reply[0]; // 다음 검색 위치
                const keys = reply[1];

                for (const key of keys) {
                    console.log(`Processing key: ${key}`);
                    const postId = key.split(':')[1];

                    if (!postId) {
                        console.error(`Invalid key format for ${key}`);
                        continue;
                    }

                    const views = await redisClient.get(key);

                    if (!views) {
                        console.error(`No views found for postId ${postId}`);
                        continue;
                    }

                    const viewCount = parseInt(views);

                    if (isNaN(viewCount)) {
                        console.error(`Invalid view count for postId ${postId}`);
                        continue;
                    }

                    // ✅ DB에 조회수 반영
                    await PostRepository.incrementViewCnt({ by: viewCount, id: postId });

                    // ✅ Redis에서 삭제
                    await redisClient.del(key);
                }
            } while (cursor !== '0'); // 모든 키 검색이 끝날 때까지 반복
        } catch (error) {
            console.error('❌ Error syncing views to database:', error);
            throw new Error('Failed to sync views to database');
        }
    }
}



module.exports = new PostService();
