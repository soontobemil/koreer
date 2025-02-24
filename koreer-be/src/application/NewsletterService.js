const Newsletter = require('../domain/Newsletter');

class NewsletterService {
  constructor(perplexityAPI, openAIAPI, repository) {
    this.perplexityAPI = perplexityAPI;
    this.openAIAPI = openAIAPI;
  }

  async createNewsletter(query) {
    console.log('🚀 Perplexity API 요청 중...');
    const summary = await this.perplexityAPI.fetchSummary(query);
    if (!summary) return null;

    console.log('🚀 GPT로 데이터 가공 중...');
    const formattedContent = await this.openAIAPI.formatNewsletter(summary);
    if (!formattedContent) return null;

    const newsletter = new Newsletter(summary, formattedContent);
    return newsletter;
  }
}

module.exports = NewsletterService;
