const axios = require('axios');

// 24/08/01 exceeded the MONTHLY quota..
const options1 = {
  method: 'GET',  
  url: 'https://linkedin-data-api.p.rapidapi.com/search-jobs',
  params: { 
    query: 'keywords=Node.js&locationId=103366113&datePosted=pastMonth&sort=mostRelevan' 
    },
  headers: {
    'X-RapidAPI-Host': 'linkedin-data-api.p.rapidapi.com',
    'X-RapidAPI-Key': '858b17a39amsh15f502e313e8cffp10c854jsnfeac807c2e37'
  }
};

const options2 = {
    method: 'GET',  
    url: 'https://linkedin-data-scraper.p.rapidapi.com/search_jobs',
    params:{
      query: 'Node.js',
      page:1,
      searchLocationId:'103366113',
      experience:'3,4',
      postedAgo:86400,
      sortBy:'R'
    },
    headers: {
      'X-RapidAPI-Host': 'linkedin-data-scraper.p.rapidapi.com',
      'X-RapidAPI-Key': '858b17a39amsh15f502e313e8cffp10c854jsnfeac807c2e37'
    }
  };
const options3 = {
    method: 'POST',  
    url: 'https://linkedin-data-scraper.p.rapidapi.com/search_jobs',
    headers: {
        'X-RapidAPI-Host': 'linkedin-data-scraper.p.rapidapi.com',
        'X-RapidAPI-Key': '858b17a39amsh15f502e313e8cffp10c854jsnfeac807c2e37',
        'Content-Type': 'application/json' 
    },
    data :{
        "keywords": "Mern Stack Developer",
        "location": "California, United States",
        "count": 10
    }
};

async function fetchJobListings() {
  try {
    const response = await axios.request(options2);
    console.log('TOTAL COUNTS :', response.data.length);
    console.log('Full Response Data:', JSON.stringify(response.data, null, 4));
    if (Array.isArray(response.data)) {
        console.log('Array length:', response.data.length);
      } else {
        console.log('response.data is not an array');
      }
  } catch (error) {
    console.error('Error fetching job listings:', error);
  }
}

fetchJobListings();
