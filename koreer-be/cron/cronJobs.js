const cron = require('node-cron');
const { fetchAndInsertJobInfos } = require('../services/jobInfoService');

// Scheduling at 11 PM every day
cron.schedule('0 23 * * *', () => {
    console.log('Running Cron Job: Fetching daily job infos');
    fetchAndInsertJobInfos('adzuna');
});
