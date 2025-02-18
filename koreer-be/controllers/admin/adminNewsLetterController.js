// Get request data from routes
const AdminNewsLetterService = require('../../services/admin/AdminNewsLetterService');

async function createNewsLetter(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const news = await AdminNewsLetterService.createNewsLetter(data);
    res.status(201).json(news);
  } catch (error) {
    console.error('Error creating newsletter:', error); // error log
    res.status(400).json({ message: '뉴스레터 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getNewsLetters(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 page와 limit 가져오기

    const letters = await AdminNewsLetterService.getNewsLetters(Number(page), Number(limit), req);

    res.status(200).json(letters);
  } catch (error) {
    console.error('Error in getNewsLettersHandler:', error);
    res.status(500).json({ message: 'Error fetching letters' });
  }
}
async function getNewsLetterById(req, res) {
  try {
    const letter = await AdminNewsLetterService.getNewsLetterById(req);
    if (letter) {
      res.status(200).json(letter);
    } else {
      res.status(404).json({ message: '등록된 뉴스레터가 없습니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '뉴스레터를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function updateNewsLetter(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const id = req.params.id;
    if(!id) {
      throw new Error('뉴스레터 키가 존재하지 않습니다.');
    }
    const letter = await AdminNewsLetterService.updateNewsLetter(id,data);
    res.status(201).json(letter);
  } catch (error) {
    console.error('Error updating newsletter:', error); // error log
    res.status(400).json({ message: '뉴스레터 수정 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function deleteNewsLetter(req, res) {
  try {
    const id = req.params.id;
    const result = await AdminNewsLetterService.deleteNewsLetter(id);
    
    res.status(201).json(result);
  } catch (error) {
    console.error('Error deleting newsletter:', error); // error log
    res.status(400).json({ message: '뉴스레터 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  createNewsLetter,
  getNewsLetters,
  getNewsLetterById,
  updateNewsLetter,
  deleteNewsLetter
};
