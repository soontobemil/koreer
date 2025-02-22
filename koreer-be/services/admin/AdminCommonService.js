const {AdminCurrentCountDTO} = require("../../dtos/admin/AdminCurrentCountDTO");
const db = require('../../models');
const { User, Post } = db;

class AdminCommonService {
    async getCurrentCounts(id, user_id) {
        try {
            // 게시글 전체 카운트 (삭제되지 않은 게시글)
            const communityCount = await Post.count({
                where: {
                    deleted_at: null
                }
            });

            // 활성 유저 전체 카운트
            const userCount = await User.count({
                where: {
                    is_active: 'Y'
                }
            });

            return new AdminCurrentCountDTO({
                userCount,
                communityCount
            });
        } catch (error) {
            console.error('Error getting counts:', error);
            throw error;
        }
    }
}

module.exports = new AdminCommonService();