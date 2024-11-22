// dtos/post.dto.js
class CreateCommentDTO {
    constructor({ post_id, content, user_email }) {
        this.post_id = post_id;
        this.content = content;
        this.user_email = user_email;
    }
}

class CommentResponseDTO {
    constructor(comment) {
        this.id = comment.id;
        this.post_id = comment.post_id;
        this.content = comment.content;
        this.user_email = comment.user_email;
        this.created_at = comment.created_at;
        this.updated_at = comment.updated_at;
        this.is_owner = comment.is_owner;
    }
}

module.exports = { CreateCommentDTO, CommentResponseDTO };
