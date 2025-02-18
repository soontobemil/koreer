// Get request data from routes
const SubscriberService = require('../services/SubscriberService');

async function createSubscriber(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const sub = await SubscriberService.createSubscriber(data);
    res.status(201).json(sub);
  } catch (error) {
    console.error('Error creating sub:', error); // error log
    res.status(400).json({ message: '구독자 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function subDuplCheck(req, res) {
  try {
    const result = await SubscriberService.subDuplCheck(req.params.email);
    if (result) {
      res.status(200).json({ message: '등록 가능한 메일입니다.' });
    } else {
      res.status(404).json({ message: '중복된 메일입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '중복된 메일을 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}


module.exports = {
  createSubscriber,
  subDuplCheck
};
