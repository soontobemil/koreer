// dtos/post.dto.js
class CreatePostDTO {
    constructor({ title, content, category }) {
        this.title = title;
        this.content = content;
        this.category = category
    }
}

class PostResponseDTO {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.user_email = post.user_email;
        this.created_at = post.created_at;
        this.updated_at = post.updated_at;
        this.is_owner = post.is_owner;
    }
}

module.exports = { CreatePostDTO, PostResponseDTO };
