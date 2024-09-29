class CareerTipsResponseDTO {
    constructor(id, title, content, view_count, user_id, category, created_at, updated_at) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.view_count = view_count;
        this.user_id = user_id;
        this.category = category;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}


module.exports = { CareerTipsResponseDTO };