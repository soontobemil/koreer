const Newsletter = require('../domain/Newsletter');

class NewsletterService {
  constructor(perplexityAPI, openAIAPI) {
    this.perplexityAPI = perplexityAPI;
    this.openAIAPI = openAIAPI;
  }

  // ✅ 서비스 초기화 메서드
  async init() {
    console.log('🚀 NewsletterService 초기화 중...');
    await this.perplexityAPI.init();  // ✅ Perplexity 프롬프트 로드
    await this.openAIAPI.init();  // ✅ OpenAI 프롬프트 로드
    console.log('✅ NewsletterService 초기화 완료!');
  }

  async createNewsletter() {
    console.log('🚀 Perplexity API 요청 중...');
    const summary = await this.perplexityAPI.fetchSummary();
    if (!summary) return null;

    console.log('🚀 GPT로 데이터 가공 중...');
    const formattedContent = await this.openAIAPI.formatNewsletter(summary);
    if (!formattedContent) return null;

    const newsletter = new Newsletter(summary, formattedContent);
    return newsletter;
  }
}

module.exports = NewsletterService;
