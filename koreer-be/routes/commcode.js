const express = require('express');
const router = express.Router();
const commCodeController = require('../controllers/commCodeController');

router.get('/:groupCode?', commCodeController.getCommonCodes);

module.exports = router;