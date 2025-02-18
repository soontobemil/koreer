const cron = require('node-cron');
const { fetchAdzunaJobInfos,fetchRapidJobInfos,deleteJobInfos } = require('../services/jobInfoService');
const postService = require('../services/postService');
const AdminSubscriberService = require('../services/admin/AdminSubscriberService');

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

// 매시간 동기화
cron.schedule('*/5 * * * *', () => {
    postService.syncViewsToDatabase().then(() => {
    console.log('View counts synced to database');
  });
});

// 뉴스레터 전송
cron.schedule('00 07 * * *', () => {
    try{
        console.log('Start Running to send NewsLetters..');
        AdminSubscriberService.sendNewsLetter();
    } catch (error) {
        console.log('Error Occured Running Sending NewsLetters Cron Job:',error);
    }
});

