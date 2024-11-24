const express = require('express');
const router = express.Router();
const careerInfoController = require("../controllers/careerTipsController");

router.get('/', careerInfoController.getCareerTips); // GET url 'localhost:3000/careertips'

module.exports = router;