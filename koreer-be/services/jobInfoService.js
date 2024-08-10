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
    const results_per_page = 20;
    const max_days_old = 10;
    const sort_by = "date";
    
    let url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${what}&where=${where}`;
    url = url + `&results_per_page=${results_per_page}&max_days_old=${max_days_old}&sort_by=${sort_by}`;
    // API Request
    const response = await axios.get(url);
    // Response
    const jobInfos = response.data.results;
    
    // Insert Into job_information 
    // location: { area: [ 'Canada', 'British Columbia', 'Greater Vancouver', 'Vancouver' ]}}
    for (const job of jobInfos) {
      await db.JobInfo.create({
        company_name: job.company.display_name,
        salary: job.salary_is_predicted,
        job_description: job.description,
        job_title: job.title,
        country: job.location.area[0],
        location: job.location.area[3],
        api_category: apiType
      });
    }

    console.log('Job infos have been inserted successfully!');
  } catch (error) {
    console.error('Error fetching or inserting job infos:', error);
  }
}

async function getJobInfos(condition) {
  try {

    // Query Reconstruction
    if(condition.location){
      condition.location = { [db.Op.iLike]: `%${condition.location}%` };
    }
    const jobInfos = await db.JobInfo.findAll({
      where: condition
    });

    return jobInfos;
  } catch (error) {
    console.error('Error fetching job jobInfos with condition:', error);
    throw error;
  }
}

module.exports = {
  fetchAndInsertJobInfos,
  getJobInfos
};
