const rateLimit = require('express-rate-limit');

const chatbotLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15분
    max: 50 // IP당 최대 요청 수
});

module.exports = chatbotLimiter;