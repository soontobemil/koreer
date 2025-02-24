const axios = require('axios');
const path = require('path');
const fs = require('fs');

class PerplexityAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.perplexity.ai/chat/completions';
    this.prompt = ''; // ✅ 기본값 설정
  }

  // ✅ 파일을 읽어 this.content에 저장하는 초기화 함수
  async init() {
    const filePath = path.join(__dirname, '../data/research_prompt.txt'); 
      try {
          console.log('📌 파일에서 콘텐츠 읽는 중:', filePath);
          this.prompt = fs.readFileSync(filePath, 'utf-8');
          console.log('📌 읽은 콘텐츠 저장 완료!');
      } catch (error) {
          console.error('❌ 파일 읽기 실패:', error.message);
          this.prompt = ''; // 실패 시 빈 값으로 설정
      }
  }

  async fetchSummary() {
    try {
      if (!this.prompt) {
        throw new Error('❌ 파일에서 읽은 프롬프트가 없습니다.');
      }

      const response = await axios.post(
        this.baseUrl,
        {
          model: 'sonar',
          messages: [{ role: 'user', content: this.prompt }],
          max_tokens: 4000,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          timeout: 0, // ✅ 타임아웃 없음 (응답이 끝날 때까지 기다림)
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
