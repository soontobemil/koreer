// Get request data from routes
const AdminSubscriberService = require('../../services/admin/AdminSubscriberService');
const jwt = require("jsonwebtoken");

async function getSubscriberById(req, res) {
  try {
    const sub = await AdminSubscriberService.getSubscriberById(req.params.id,req.user.id);
    if (sub) {
      res.status(200).json(sub);
    } else {
      res.status(404).json({ message: '존재하지 않는 구독자입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '구독자를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getSubscribers(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 page와 limit 가져오기

    const subs = await AdminSubscriberService.getSubscribers(Number(page), Number(limit), req);

    res.status(200).json(subs);
  } catch (error) {
    console.error('Error in getSubscribersHandler:', error);
    res.status(500).json({ message: 'Error fetching subs' });
  }
}

async function deleteSubscriber(req, res) {
  try {
    // start data processing logic
    const id = req.params.id;
    const sub = await AdminSubscriberService.deleteSubscriber(id);
    res.status(201).json(sub);
  } catch (error) {
    console.error('Error deleting sub:', error); // error log
    res.status(400).json({ message: '구독자 삭제 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  getSubscribers,
  getSubscriberById,
  deleteSubscriber
};
