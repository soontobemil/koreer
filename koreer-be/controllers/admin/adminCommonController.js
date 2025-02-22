const AdminCommonService = require("../../services/admin/AdminCommonService");

async function getCurrentCounts(req, res) {
    try {
        console.log('try >>>>>>')
        const counts = await AdminCommonService.getCurrentCounts(req.params.id, req.user.id);

        return res.status(200).json({
            status: 'success',
            message: '현재 카운트를 성공적으로 조회했습니다.',
            data: counts
        });
    } catch (error) {
        console.error('Error getting counts:', error);
        return res.status(500).json({
            status: 'error',
            message: '카운트 조회 중 오류가 발생했습니다: ' + error.message
        });
    }
}

module.exports = {
    getCurrentCounts
};
