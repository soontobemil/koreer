const careerTipsService = require("../services/careerTipsService");

async function getCareerTips(req, res) {
    try {

        console.log('123123')
        // 검색 추가 예정(파라미터)
        const jobInfos = await careerTipsService.getCareerTips();

        res.status(200).json(jobInfos);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send('An error occurred while fetching.');
    }
}

module.exports = {
    getCareerTips
};

