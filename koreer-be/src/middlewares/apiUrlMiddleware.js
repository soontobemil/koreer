const axios = require('axios');
require('dotenv').config();

// .env 파일에서 API_URL 가져오기
const API_URL = process.env.API_URL;

// 요청이 들어올 때마다 API_URL을 자동으로 붙이는 미들웨어
const apiUrlToRequest = (req, res, next) => {
  req.fullUrl = `${API_URL}${req.originalUrl}`;
  console.log(`Full URL with API_URL: ${req.fullUrl}`); // 요청된 URL과 결합된 API_URL 확인
  next();
};

module.exports = apiUrlToRequest;
