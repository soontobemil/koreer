const express = require('express');
const router = express.Router();
const inquiryController = require("../controllers/inquiryController");

router.post('/', inquiryController.registerInquiry);

module.exports = router;