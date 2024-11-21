// repositories/post.repository.js
const db = require('../models');

class PostRepository {
    async create(postData) {
        return await db.Post.create(postData);
    }

    async findById(id) {
        return await db.Post.findOne({ where: { id } });
    }

    async update(id, updateData) {
        return await db.Post.update(updateData, { where: { id } });
    }

    async delete(id) {
        return await db.Post.destroy({ where: { id } });
    }
}

module.exports = new PostRepository();
