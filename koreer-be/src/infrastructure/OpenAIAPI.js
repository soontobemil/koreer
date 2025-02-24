const axios = require('axios');
const fs = require('fs');
const path = require('path');

class OpenAIAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    this.prompt = ''; // ✅ 기본값 설정
  }

   // ✅ 파일을 읽어 this.content에 저장하는 초기화 함수
   async init() {
    const filePath = path.resolve(__dirname, '../data/format_prompt.txt');
    try {
        console.log('📌 파일에서 콘텐츠 읽는 중:', filePath);
        this.prompt = fs.readFileSync(filePath, 'utf-8');
        console.log('📌 읽은 콘텐츠 저장 완료!');
    } catch (error) {
        console.error('❌ 파일 읽기 실패:', error.message);
        this.prompt = ''; // 실패 시 빈 값으로 설정
    }
  }

  async formatNewsletter(content) {
    try {
      if (!this.prompt) {
        throw new Error('❌ 파일에서 읽은 프롬프트가 없습니다.');
      }

      const response = await axios.post(
        this.baseUrl,
        {
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: 'You are an AI assistant that refines and structures content for a professional newsletter.' },
            { role: 'user', content: `${this.prompt}${content}` },
          ],
          max_tokens: 4096,
          temperature: 0.7,
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
      console.error('❌ OpenAI API 요청 실패:', error.response ? error.response.data : error.message);
      return null;
    }
  }
}

module.exports = OpenAIAPI;
