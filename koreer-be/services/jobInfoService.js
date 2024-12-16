// Add Business logics here
const axios = require('axios');
const db = require('../models');
const { ERROR_MESSAGES,COUNTRY_INFOS } = require('@common/constants');

async function fetchAdzunaJobInfos(apiType) {
  try {
    // Adzuna API KEY & APP ID
    const APP_ID = process.env.ADZUNA_APP_ID;
    const APP_KEY = process.env.ADZUNA_API_KEY;
    const country = 'Canada';

    const params = {
      what: 'node',
      country :COUNTRY_INFOS[country].COUNTRY_CODE,
      where : COUNTRY_INFOS[country].CITY_1,
      results_per_page : 20,
      max_days_old : 10,
      sort_by : "date"
    }
    
    let url = `https://api.adzuna.com/v1/api/jobs/${params.country}/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${params.what}&where=${params.where}`;
    url = url + `&results_per_page=${params.results_per_page}&max_days_old=${params.max_days_old}&sort_by=${params.sort_by}`;
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
<<<<<<< HEAD
        api_category: apiType,
        posted_at:job.created
=======
        api_category: apiType
>>>>>>> 28b2ace (Modify Response data to insert job_information)
      });
    }

    console.log('Job infos have been inserted successfully!');
    return 'Y';
  } catch (error) {
    console.error('Error fetching or inserting job infos:', error);
    return 'N';
  }
}

async function fetchRapidJobInfos(apiType) {
  try {
    // Adzuna API KEY & APP ID
    const API_HOST = process.env.RAPIDAPI_HOST;
    const API_KEY = process.env.RAPIDAPI_KEY;
    const country = 'Canada';
    const options = {
      method: 'GET',  
      url: 'https://linkedin-data-scraper.p.rapidapi.com/search_jobs',
      params:{
        query: 'Node.js',
        page:1,
        searchLocationId:COUNTRY_INFOS[country].LOCATION_ID,
        experience:'3,4',
        postedAgo:86400,
        sortBy:'R'
      },
      headers: {
        'X-RapidAPI-Host': API_HOST,
        'X-RapidAPI-Key': API_KEY
      }
    };
    
    // Request
    const response = await axios.request(options);

    // Response
    /*
    {
      success: true,
      status: 200,
      response: {
        jobs: [
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object], [Object], [Object],
          [Object]
        ],
        paging: { total: 55, start: 0, count: 25 }
      }
    }
    */
    const jobInfos = response.data.response.jobs;
    
    // Insert Into job_information 
    for (const job of jobInfos) {
      await db.JobInfo.create({
        company_name: job.companyName,
        salary: 0,
        job_description: job.jobDescription,
        job_title: job.title,
        country: country,
        location: job.formattedLocation,
        api_category: apiType,
        posted_at:job.listedAt
      });
    }

    console.log('Job infos have been inserted successfully!');
    return 'Y';
  } catch (error) {
    console.error('Error fetching or inserting job infos:', error);
    return 'N';
  }
}

async function getJobInfos(conditions) {
  try {

    let where = {};
    // Query Reconstruction
    if(conditions.equals){
      for (let c in conditions.equals) {
        where[c] = conditions.equals[c];
      }
    }
    if(conditions.iLike){
      for (let c in conditions.iLike) {
        where[c] = { [db.Op.iLike]: `%${conditions.iLike[c]}%` };
      }
    }
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    where.posted_at = {[db.Op.between]:[threeMonthsAgo,now]};

    const jobInfos = await db.JobInfo.findAll({
      where: where,
      order: [
        ['posted_at','DESC NULLS LAST']
      ]
    });

    return jobInfos;
  } catch (error) {
    console.error('Error fetching job jobInfos with condition:', error);
    throw error;
  }
}

module.exports = {
  fetchAdzunaJobInfos,
  fetchRapidJobInfos,
  getJobInfos
};
