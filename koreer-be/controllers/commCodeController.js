// Get request data from routes
const CommCodeService = require('../services/CommCodeService');

async function getCommonCodes(req, res) {
  try {
    const groupCode = req.params.groupCode;
    const codes = await CommCodeService.getCommonCodes(groupCode);
    if (codes) {
      res.status(200).json(codes);
    } else {
      res.status(404).json({ message: '등록된 코드가 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '코드를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  getCommonCodes,
};
