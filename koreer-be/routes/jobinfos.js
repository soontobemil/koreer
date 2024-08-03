const express = require('express');
const router = express.Router();
const jobInfoController = require('../controllers/jobInfoController');


router.get('/fetch-job-infos/:apiType', jobInfoController.fetchAndInsertJobInfos); // get url such as 'localhost:3000/jobinfos/fetch-job-infos/adzuna'
//router.post('/', userController.createUser);


module.exports = router;