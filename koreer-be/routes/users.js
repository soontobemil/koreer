const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/:email', userController.getUserByEmail); // get url such as 'localhost:3000/users/mail@example.com'
router.post('/', userController.createUser);
router.get('/dupl-check/:email', userController.userDuplCheck);


module.exports = router;