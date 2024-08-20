const cron = require('node-cron');
const { fetchAdzunaJobInfos,fetchRapidJobInfos,deleteJobInfos } = require('../services/jobInfoService');

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
cron.schedule('10 00 * * *', () => {
    try{
        console.log('Start running Cron Job..');
        performBatchJob();
    } catch (error) {
        console.log('Error occured Running Cron Job:',error);
    }
});

cron.schedule('35 00 * * *', () => {
    try{
        console.log('Start Running Delete Cron Job..');
        deleteJobInfos();
    } catch (error) {
        console.log('Error Occured Running Delete JobInfo Cron Job:',error);
    }
});
