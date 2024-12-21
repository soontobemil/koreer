// services/post.service.js
const PostRepository = require('../repositories/PostRepository');
const { CreatePostDTO, PostResponseDTO } = require('../dtos/PostDTO');
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

    async getPostById(id) {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new Error('Post not found');
        }
        return new PostResponseDTO(post);
    }

    async getPosts(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;
            const currentUserEmail = getUserEmail(req)

            // 레포지토리에서 데이터 가져오기
            const { rows: posts, count: total } = await PostRepository.getPostsWithPagination(offset, limit);

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
}



module.exports = new PostService();
