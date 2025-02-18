// dtos/post.dto.js
class AdminNewsLetterDTO {
    constructor(news) {
        this.id = news.id;
        this.title = news.title;
        this.content = news.content;
        this.category = news.category;
        this.send_date = news.send_date;
        this.created_by = news.created_by;
        this.created_at = news.created_at;
        this.updated_at = news.updated_at;
        this.deleted_at = news.deleted_at;
    }
}

module.exports = { AdminNewsLetterDTO };
