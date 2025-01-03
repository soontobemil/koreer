// services/post.service.js
const PostRepository = require('../repositories/PostRepository');
const { CreatePostDTO, PostResponseDTO } = require('../dtos/PostDTO');
const Redis = require('ioredis');
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

    async getPostById(id,user_id) {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        const viewCnt = await this.viewPost(post.id, user_id);
        if(viewCnt) {
            post.view_count = parseInt(post.view_count)+parseInt(viewCnt);
        }
        return new PostResponseDTO(post);
    }

    async viewPost(postId, userId) {
        try {
            // Redis 클라이언트 생성
            const redis = new Redis({
                host: process.env.REDIS_HOST,
                port: process.env.REDIS_PORT,
            });
            const redisKey = `view:${postId}:${userId}`;
    
            // 중복 조회 방지: Redis에서 조회 기록 확인
            const isViewed = await redis.get(redisKey);
            if (isViewed) {
                console.log(`User ${userId} already viewed post ${postId}`);
                return;
            }
    
            // 조회수 증가 처리: Redis에 조회 상태 저장 (1시간 TTL)
            await redis.set(redisKey, true, 'EX', 3600); // 1시간 동안 유지
            await redis.incr(`post:${postId}:views`); // Redis에 조회수 증가
    
            // 증가된 조회수 가져오기
            const newViewCount = await redis.get(`post:${postId}:views`);

            console.log(`Post ${postId} viewed by user ${userId}`);
            console.log(`New view count for post ${postId}: ${newViewCount}`);

            return newViewCount;  // 증가된 조회수 반환
        } catch (error) {
            console.error('Error in viewPost:', error);
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
        return { message: 'Post deleted successfully' };
    }

    async syncViewsToDatabase() {
        // Redis 클라이언트 생성
        const redis = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
        });

        const keys = await redis.keys('post:*:views');
        
        for (const key of keys) {
            console.log(`Processing key: ${key}`);  // key 값 확인
            const postId = key.split(':')[1];

            if (!postId) {
                console.error(`Invalid key format for ${key}`);
                continue;  
            }

            const views = await redis.get(key);

            if (!views) {
                console.error(`No views found for postId ${postId}`);
                continue;  
            }    

            const viewCount = parseInt(views);

            if (isNaN(viewCount)) {
                console.error(`Invalid view count for postId ${postId}`);
                continue; 
            }
        
            // DB에 조회수 반영
            await PostRepository.incrementViewCnt({ by: viewCount, id: postId });

            // Redis에서 삭제
            await redis.del(key);
        }
    }
}



module.exports = new PostService();
