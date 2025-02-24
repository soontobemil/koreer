const axios = require('axios');

class OpenAIAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
  }

  async formatNewsletter(content) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: 'You are an AI assistant that refines and structures content for a professional newsletter.' },
            { role: 'user', content: `Format the following data into a HTML tag structured newsletter  with writing technical terms with their Korean translations next to them:\n\n${content}` },
          ],
          max_tokens: 4096,
          temperature: 0.7,
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
      console.error('❌ OpenAI API 요청 실패:', error.response ? error.response.data : error.message);
      return null;
    }
  }
}

module.exports = OpenAIAPI;
