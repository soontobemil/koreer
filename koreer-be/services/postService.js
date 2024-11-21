// services/post.service.js
const PostRepository = require('../repositories/PostRepository');
const { CreatePostDTO, PostResponseDTO } = require('../dtos/PostDTO');

class PostService {
    async createPost(postData) {
        const createPostDTO = new CreatePostDTO(postData); // DTO 적용
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
