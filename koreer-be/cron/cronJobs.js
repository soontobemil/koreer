const cron = require('node-cron');
const { fetchAdzunaJobInfos,fetchRapidJobInfos } = require('../services/jobInfoService');

// Refine Promise.all process
const adzunaInfoJob = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fetchAdzunaJobInfos('adzuna'));
        }, 1000);
    });
};

const rapidInfoJob = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fetchRapidJobInfos('rapidapi'));
        }, 1000);
    });
};

// Promise.all async processing
const performBatchJob = async () => {
    try {
        const results = await Promise.all([
            adzunaInfoJob(),
            rapidInfoJob()
        ]).then((results) => {
            console.log('All promises resolved:', results); 
        }).catch((error) => {
            console.error('One of the promises failed:', error);
        });
        console.log('All jobs completed successfully:');
    } catch (error) {
        console.error('Error in batch job:', error);
    }
};

// Scheduling at 11 PM every day
cron.schedule('20 16 * * *', () => {
    try{
        console.log('Start running Cron Job..');
        performBatchJob();
    } catch (error) {
        console.log('Error occured Running Cron Job:',error);
    }
});
