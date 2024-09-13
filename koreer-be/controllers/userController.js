// Get request data from routes
const userService = require('../services/userService');

async function createUser(req, res) {
  try {
    // start data processing logic
    const data = req.body;
    const user = await userService.createUser(data);
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error); // error log
    res.status(400).json({ message: '사용자 등록 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function getUserByEmail(req, res) {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: '등록된 사용자가 아닙니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '사용자를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

async function userDuplCheck(req, res) {
  try {
    const result = await userService.userDuplCheck(req.params.email);
    if (result) {
      res.status(200).json({ message: '등록 가능한 사용자입니다.' });
    } else {
      res.status(404).json({ message: '중복된 사용자입니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '중복된 사용자를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  userDuplCheck
};
