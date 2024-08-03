// Add Business logics here
const axios = require('axios');
const db = require('../models');

async function fetchAndInsertJobInfos(apiType) {
  try {
    // Adzuna API KEY & APP ID
    const APP_ID = process.env.ADZUNA_APP_ID;
    const APP_KEY = process.env.ADZUNA_API_KEY;

    const what = 'node';
    const country = 'ca';
    const where = 'vancouver';

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${what}&where=${where}`;
    // API 호출
    const response = await axios.get(url);
    // 응답 데이터
    const jobInfos = response.data.results;
    
    // 각 잡 포스팅 데이터베이스에 삽입
    for (const job of jobInfos) {
      await db.JobInfo.create({
        company_name: job.company.display_name,
        salary: job.salary_is_predicted,
        job_description: job.description,
        job_title: job.title,
        country: country,
        location: job.location.display_name,
        api_category: apiType
      });
    }

    console.log('Job infos have been inserted successfully!');
  } catch (error) {
    console.error('Error fetching or inserting job infos:', error);
  }
}

module.exports = {
  fetchAndInsertJobInfos
};
