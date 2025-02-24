class AdminSubscriberDTO {
    constructor(data) {
        this.id = data.id;
        this.user_email = data.user_email;
        this.category = data.category;
        this.post_category = data.post_category;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;
        this.deleted_at = data.deleted_at;
    }
}

module.exports = { AdminSubscriberDTO };
