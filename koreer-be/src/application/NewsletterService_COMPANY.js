const Newsletter = require('../domain/Newsletter');
const fs = require('fs');
const path = require('path');

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
    const contents = await this.openAIAPI.generateNewsletter(summary);
    if (!contents) return null;

    const filePath = path.resolve(__dirname, '../data/newsletter_day3.html');
    console.log('📌 파일에서 콘텐츠 읽는 중:', filePath);
    // 📌 HTML 템플릿 불러오기
    let templateHtml = fs.readFileSync(filePath, "utf8");
    // 📌 데이터 삽입
    templateHtml = templateHtml
    .replace(/\$\{company_name\}/g, "AWS")
    .replace("${summary}", contents.summary || "")
    .replace("${salary}", contents.salary || "")
    .replace("${visa}", contents.visa || "")
    .replace("${cost_of_living}", contents.cost_of_living || "")
    .replace("${vlogs}", contents.vlogs || "");

    console.log('📌 읽은 콘텐츠 생성 완료!');

    const newsletter = new Newsletter(summary, templateHtml);
    return newsletter;
  }
}

module.exports = NewsletterService;
