const express = require('express');
const router = express.Router();
const chatbotController = require("../controllers/chabotController");
const chatbotLimiter = require("../src/middlewares/rateLimiter");

router.get('/post/:query',chatbotLimiter, chatbotController.getQuery);

module.exports = router;