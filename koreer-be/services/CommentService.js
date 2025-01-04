const CommentRepository = require('../repositories/CommentRepository');
const { CreateCommentDTO, CommentResponseDTO } = require('../dtos/CommentDTO');
const {getUserEmail} = require("../src/Auth");

class CommentService {
    async createComment(req) {
        const data = req.body;
        const email = getUserEmail(req)
        if (email === '') {
            throw new Error("로그인 후 시도해주세요.")
        }

        const createCommentDTO = new CreateCommentDTO( data.post_id, data.content, email); // DTO 적용

        const comment = await CommentRepository.create(createCommentDTO);
        return new CommentResponseDTO(comment); // DTO로 응답 생성
    }

    async getCommentById(id) {
        const comment = await CommentRepository.findById(id);
        if (!comment) {
            throw new Error('존재하지 않는 댓글입니다.');
        }
        return new CommentResponseDTO(comment);
    }

    async getComments(currentUserEmail,postId) {
        try {
            // 레포지토리에서 데이터 가져오기
            const { rows: comments, count: total }  = await CommentRepository.getComments(postId);

            const commentsDTO = comments.map(comment => {
                const isOwner = comment.user_email === currentUserEmail; // 현재 사용자와 작성자 비교
                const commentObject = comment.toJSON ? comment.toJSON() : comment; // Sequelize 객체일 경우 일반 객체로 변환
                return new CommentResponseDTO({ ...commentObject, is_owner: isOwner });
            });
        
            // 페이지네이션 메타데이터 포함 응답
            return {
                data: commentsDTO,
                meta: {
                    total
                },
            };
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw new Error('Error fetching comments');
        }
    }
      

    async updateComment(id, updateData) {
        if(updateData.content) {
            updateData = {content:updateData.content};
        } else {
            throw new Error('내용이 존재하지 않습니다.');
        }
        const [updated] = await CommentRepository.update(id, updateData);
        if (!updated) {
            throw new Error('Comment not found or update failed');
        }
        const updatedComment = await CommentRepository.findById(id);
        return new CommentResponseDTO(updatedComment);
    }

    async deleteComment(id) {
        const deleted = await CommentRepository.delete(id);
        if (!deleted) {
            throw new Error('Comment not found or delete failed');
        }
        return { message: 'Comment deleted successfully' };
    }
}

module.exports = new CommentService();
