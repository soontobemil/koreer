// Get request data from routes
const adminUserService = require('../../services/admin/adminUserService');

async function getUsers(req, res) {
  try {
    const { page = 1, limit = 10 } = req.query; // 쿼리 파라미터에서 page와 limit 가져오기

    const users = await adminUserService.getUsers(Number(page), Number(limit), req);

    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getUsersHandler:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
}
async function getUserByCondition(req, res) {
  try {
    const user = await adminUserService.getUserByCondition(req);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: '등록된 사용자가 아닙니다.' });
    }
  } catch (error) {
    res.status(400).json({ message: '사용자를 찾는 중 에러가 발생하였습니다. ' + error.message });
  }
}

module.exports = {
  getUsers,
  getUserByCondition
};
