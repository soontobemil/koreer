const jobInfoService = require('../services/jobInfoService');

// API Endpoint: /jobinfos/fetch-job-infos/adzuna
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

// API Endpoint: /jobinfos/search?country=ca&location=vancouver
async function getJobInfos(req, res) {
    try {
        const condition = {};
    
        if (req.query.country) {
            condition.country = req.query.country;
        }
        if (req.query.location) {
            condition.location = req.query.location;
        }

        // This can be replaced with query string.
        condition.api_category = 'adzuna';

        const jobInfos = await jobInfoService.getJobInfos(condition);
        //console.log(jobInfos);
        res.status(200).json(jobInfos);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send('An error occurred while fetching job infos.');
    }
}

module.exports = {
    fetchAndInsertJobInfos,
    getJobInfos
  };
