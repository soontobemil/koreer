const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

/* Create  */
router.post('/subscribers', subscriberController.createSubscriber);

module.exports = router;