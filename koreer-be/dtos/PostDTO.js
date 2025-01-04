// dtos/post.dto.js
class CreatePostDTO {
    constructor({ title, content, user_email, category }) {
        this.title = title;
        this.content = content;
        this.user_email = user_email;
        this.category = category;
    }
}

class PostResponseDTO {
    constructor(post) {
        this.id = post.id;
        this.title = post.title;
        this.content = post.content;
        this.username = post.username;
        this.user_email = post.user_email;
        this.nation = post.nation;
        this.created_at = post.created_at;
        this.updated_at = post.updated_at;
        this.is_owner = post.is_owner;
        this.category = post.category
    }
}

class PostDTO {
    constructor(post) {
        Object.assign(this, post.dataValues);
    }
}

module.exports = { CreatePostDTO, PostResponseDTO, PostDTO };
