const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://linkedin-data-api.p.rapidapi.com/search-jobs',
  params: { 
    query: 'keywords=python&locationId=92000000&datePosted=anyTime&sort=mostRelevan' 
    },
  headers: {
    'X-RapidAPI-Host': 'linkedin-data-api.p.rapidapi.com',
    'X-RapidAPI-Key': '858b17a39amsh15f502e313e8cffp10c854jsnfeac807c2e37'
  }
};

async function fetchJobListings() {
  try {
    const response = await axios.request(options);
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
