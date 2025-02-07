// Get request data from routes
const adminCommCodeService = require('../../services/admin/adminCommCodeService');

async function createCode(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const code = await adminCommCodeService.createCode(data);
    res.status(201).json(code);
  } catch (error) {
    console.error('Error creating code:', error); // error log
    res.status(400).json({ message: '코드 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getCodes(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 page와 limit 가져오기

    const codes = await adminCommCodeService.getCodes(Number(page), Number(limit), req);

    res.status(200).json(codes);
  } catch (error) {
    console.error('Error in getCodesHandler:', error);
    res.status(500).json({ message: 'Error fetching codes' });
  }
}
async function getCodeByGroupCode(req, res) {
  try {
    const codes = await adminCommCodeService.getCodeByGroupCode(req);
    if (codes) {
      res.status(200).json(codes);
    } else {
      res.status(404).json({ message: '등록된 코드가 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '코드를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function updateCode(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const codeId = req.params.id;
    if(!codeId) {
      throw new Error('코드 아이디가 존재하지 않습니다.');
    }
    const code = await adminCommCodeService.updateCode(codeId,data);
    res.status(201).json(code);
  } catch (error) {
    console.error('Error updating code:', error); // error log
    res.status(400).json({ message: '코드 수정 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deleteCode(req, res) {
  const codeId = req.params.id;
  const deleted = await adminCommCodeService.deleteCode(codeId);
  if (!deleted) {
      throw new Error('Code not found or delete failed');
  }
  return { message: 'Code deleted successfully' };
}

module.exports = {
  createCode,
  getCodes,
  getCodeByGroupCode,
  updateCode,
  deleteCode
};
