// Get request data from routes
const AdminComInfoService = require('../../services/admin/AdminComInfoService');

async function createInfo(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const info = await AdminComInfoService.createInfo(data);
    res.status(201).json(info);
  } catch (error) {
    console.error('Error creating company-info:', error); // error log
    res.status(400).json({ message: '회사 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getInfos(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 page와 limit 가져오기

    const infos = await AdminComInfoService.getInfos(Number(page), Number(limit), req);

    res.status(200).json(infos);
  } catch (error) {
    console.error('Error in getInfosHandler:', error);
    res.status(500).json({ message: 'Error fetching infos' });
  }
}
async function getInfoById(req, res) {
  try {
    const infos = await AdminComInfoService.getInfoById(req);
    if (infos) {
      res.status(200).json(infos);
    } else {
      res.status(404).json({ message: '등록된 회사가 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '회사를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function updateInfo(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const infoId = req.params.id;
    if(!infoId) {
      throw new Error('회사 아이디가 존재하지 않습니다.');
    }
    const info = await AdminComInfoService.updateInfo(infoId,data);
    res.status(201).json(info);
  } catch (error) {
    console.error('Error updating info:', error); // error log
    res.status(400).json({ message: '회사정보 수정 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deleteInfo(req, res) {
  try {
    const infoId = req.params.id;
    const result = await AdminComInfoService.deleteInfo(infoId);
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error updating info:', error); // error log
    res.status(400).json({ message: '회사정보 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  createInfo,
  getInfos,
  getInfoById,
  updateInfo,
  deleteInfo
};
