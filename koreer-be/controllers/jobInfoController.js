const jobInfoService = require('../services/jobInfoService');

// API 엔드포인트: /jobinfos/fetch-job-infos/adzuna
async function fetchAndInsertJobInfos(req, res) {
  try {
    const apiType = req.params.apiType;
    const jobinfo = await jobInfoService.fetchAndInsertJobInfos(apiType);
    res.status(200).send('Job infos have been fetched and inserted successfully!');
  } catch (error) {
    console.error('Error in controller:', error);
    res.status(500).send('An error occurred while fetching and inserting job infos.');
  }
}

module.exports = {
    fetchAndInsertJobInfos
  };
