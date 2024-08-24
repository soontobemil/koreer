const express = require('express');
const router = express.Router();
const jobInfoController = require('../controllers/jobInfoController');


router.get('/fetch-job-infos/:apiType', jobInfoController.fetchAndInsertJobInfos); // GET url 'localhost:3000/jobinfos/fetch-job-infos/adzuna'
router.get('/search', jobInfoController.getJobInfos); // GET url 'localhost:3000/jobinfos/search?apiType=adzuna&country=ca&location=vancouver'

module.exports = router;