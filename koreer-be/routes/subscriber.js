const express = require('express');
const router = express.Router();
const subscriberController = require('../controllers/subscriberController');

/* Create  */
router.post('/subscribers', subscriberController.createSubscriber);
router.delete('/:id/delete', subscriberController.deleteSubscriber);

module.exports = router;