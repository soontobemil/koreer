const axios = require('axios');

class PerplexityAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.perplexity.ai/chat/completions';
  }

  async fetchSummary(query) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'sonar',
          messages: [{ role: 'user', content: query }],
          max_tokens: 4000,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('❌ Perplexity API 요청 실패:', error.response ? error.response.data : error.message);
      return null;
    }
  }
}

module.exports = PerplexityAPI;
