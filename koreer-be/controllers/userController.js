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
    res.status(400).json({ message: error.message });
  }
}

async function getUserByEmail(req, res) {
  try {
    const user = await userService.getUserByEmail(req.params.email);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'ERROR : ' + error.message });
  }
}

async function userDuplCheck(req, res) {
  try {
    const result = await userService.userDuplCheck(req.params.email);
    if (result) {
      res.status(200).json({ message: 'User Not Duplicate' });
    } else {
      res.status(404).json({ message: 'User Duplicate' });
    }
  } catch (error) {
    res.status(400).json({ message: 'ERROR : ' + error.message });
  }
}

module.exports = {
  createUser,
  getUserByEmail,
  userDuplCheck
};
