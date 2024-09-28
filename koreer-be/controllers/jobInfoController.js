const jobInfoService = require('../services/jobInfoService');

// API Endpoint: /jobinfos/fetch-job-infos/adzuna
async function fetchAndInsertJobInfos(req, res) {
    try {
        const apiType = req.params.apiType;
        let result = '';
        if(apiType == 'adzuna'){
            result = await jobInfoService.fetchAdzunaJobInfos(apiType);
        }
        if(apiType == 'rapidapi'){
            result = await jobInfoService.fetchRapidJobInfos(apiType);
        }
        res.status(200).send('Job infos have been fetched and inserted successfully!');
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).send('An error occurred while fetching and inserting job infos.');
    }
}

// API Endpoint: /jobinfos/search?country=Canada&location=Vancouver&adzuna
async function getJobInfos(req, res) {
    try {
        console.log('success222')
        const conditions = {
            iLike:{},
            equals:{}
        };
    
        if (req.query.country) {
            conditions.iLike['country'] = req.query.country;
        }
        if (req.query.location) {
            conditions.iLike['location'] = req.query.location;
        }

        // This can be replaced with query string.
        conditions.equals.api_category = req.query.apiType;

        const jobInfos = await jobInfoService.getJobInfos(conditions);
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
