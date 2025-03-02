const axios = require('axios');
const fs = require('fs');
const path = require('path');

class OpenAIAPI {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1/chat/completions';
    this.prompts = {}; // ✅ 기본값 설정
  }

   // ✅ 파일을 읽어 this.content에 저장하는 초기화 함수
  //  async init() {
  //   const filePath = path.resolve(__dirname, '../data/format_prompt3.txt');
  //   try {
  //       console.log('📌 파일에서 콘텐츠 읽는 중:', filePath);
  //       this.prompt = fs.readFileSync(filePath, 'utf-8');
  //       console.log('📌 읽은 콘텐츠 저장 완료!');
  //   } catch (error) {
  //       console.error('❌ 파일 읽기 실패:', error.message);
  //       this.prompt = ''; // 실패 시 빈 값으로 설정
  //   }
  // }

  async init(day,company) {
    const files = await fs.promises.readdir(path.resolve(__dirname, `../data/format_prompt/${day}/`));
    try {
      // ✅ 병렬로 모든 파일 읽기 (성능 최적화)
      const fileReadPromises = files.map(async (file) => {
        const filePath = path.resolve(this.directory, file); // ✅ 절대 경로 사용
        const fileStat = await fs.promises.stat(filePath);

        if (!fileStat.isFile()) return; // ✅ 디렉토리 무시 (파일만 읽기)

        let fileContent = await fs.promises.readFile(filePath, "utf8");
        fileContent = fileContent.replace(/\$\{company_name\}/g, company);
        const fileNameWithoutExt = path.parse(file).name; // 확장자 제거
        this.prompts[fileNameWithoutExt] = `${fileContent}`;
      });

      await Promise.all(fileReadPromises); // ✅ 비동기 읽기 병렬 처리
      console.log('📌 읽은 콘텐츠 저장 완료!');
    } catch (error) {
        console.error('❌ 파일 읽기 실패:', error.message);
        this.prompt = ''; // 실패 시 빈 값으로 설정
    }
  }

  // async init() {
  //   this.prompts = {
  //     summary: `Translate each English sentence into natural and fluent Korean in a one sentence and insert it directly next to the English text inside a <span> tag.

  //     📌 Strict Formatting Instructions:
  //     DO NOT include section titles or headers (e.g.,"Summary", "Salary Insights", "Visa Guides").
  //     Maintain the original HTML structure (<ul>, <li>, <span>) exactly as it is.
  //     Place the Korean translation inside <span id="summary-content-korean"> immediately after the English sentence.
  //     Remove any Markdown code blocks (e.g., html,  or similar formatting).
  //     DO NOT modify the section data.
  //     Return ONLY the formatted HTML response without explanations.

  //     📌 HTML Output Format:
  //     <p id="summary-content" style="color: #333333; font-size: 14px; line-height: 1.6;"> 
  //         <ul>
  //             <li>Salary Insights: [Salary Insights here]<span id="summary-content-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;">[Korean Translation here]</span>
  //             </li>
  //             <li>Visa Guides: [Visa Guides here]<span id="summary-content-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;">[Korean Translation here]</span>
  //             </li>
  //             <li>Cost Of Living: [Cost Of Living here]<span id="summary-content-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;">[Korean Translation here]</span>
  //             </li>
  //             <li>Vlogs & Local Stories: [Vlogs here]<span id="summary-content-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;">[Korean Translation here]</span>
  //             </li>
  //         </ul>
  //     </p>
  //     `,
  //     salary: `Extract and return ONLY the Salary Analysis section only using below HTML Output Format. 
  //     📌 Formatting Instructions:
  //     DO NOT include section titles or headers (e.g., "Salary Insights", "Visa Guides").
  //     DO NOT modify, change, or remove the section data.
  //     - **Translate the content into natural, well-structured Korean in a summarized sentence format.**
  //     - **Ensure that the Korean translation is a concise and clear summary, NOT a direct word-for-word translation.**
  //     Remove any Markdown code blocks (e.g., html,  or similar formatting).
  //     If the original content includes HTML tags (<b>, <a>, <span>, etc.), retain them.
  //     Do NOT include explanations or additional text.
  //     Return ONLY the Salary Analysis section as structured HTML.
  //     📌 HTML Output Format:
  //     <p id="content1" style="color: #666666; font-size: 14px;">[Salary data here]</p><p id="content1-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;"> [Korean Translation here]</p>`,
  //     visa: `Extract and return ONLY the Visa Sponsorship section only using below HTML Output Format. 
  //     📌 Formatting Instructions:
  //     DO NOT include section titles or headers (e.g., "Salary Insights", "Visa Guides").
  //     DO NOT modify, change, or remove the section data.
  //     - **Translate the content into natural, well-structured Korean in a summarized sentence format.**
  //     - **Ensure that the Korean translation is a concise and clear summary, NOT a direct word-for-word translation.**
  //     If the original content includes HTML tags (<b>, <a>, <span>, etc.), retain them.
  //     Remove any Markdown code blocks (e.g., html,  or similar formatting).
  //     Do NOT include explanations or additional text.
  //     Return ONLY the Visa Sponsorship section as structured HTML.
  //     📌 HTML Output Format:
  //     <p id="content2"style="color: #666666; font-size: 14px; margin: 0;">[Visa sponsorship data here]</p><p id="content2-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;"> [Korean Translation here]</p>`,
  //     cost_of_living: `Extract and return ONLY the Cost of Living section only using below HTML Output Format. 
  //     📌 Formatting Instructions:
  //     DO NOT include section titles or headers (e.g., "Salary Insights", "Visa Guides").
  //     DO NOT modify, change, or remove the section data.
  //     - **Translate the content into natural, well-structured Korean in a summarized sentence format.**
  //     - **Ensure that the Korean translation is a concise and clear summary, NOT a direct word-for-word translation.**
  //     If the original content includes HTML tags (<b>, <a>, <span>, etc.), retain them.
  //     Remove any Markdown code blocks (e.g., html,  or similar formatting).
  //     Do NOT include explanations or additional text.
  //     Return ONLY the Cost of Living section as structured HTML.
  //     📌 HTML Output Format:
  //     <p id="content3" style="color: #666666; font-size: 14px; margin: 0;">[Cost of living data here]</p><p id="content3-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;"> [Korean Translation here]</p>`,
  //     vlogs: `Extract and return ONLY the Real-Life Vlogs section only using below HTML Output Format. 
  //      📌 Formatting Instructions:
  //     DO NOT include section titles or headers (e.g., "Salary Insights", "Visa Guides").
  //     DO NOT modify, change, or remove the section data.
  //     - **Translate the content into natural, well-structured Korean in a summarized sentence format.**
  //     - **Ensure that the Korean translation is a concise and clear summary, NOT a direct word-for-word translation.**
  //     If the original content includes HTML tags (<b>, <a>, <span>, etc.), retain them.
  //     Remove any Markdown code blocks (e.g., html,  or similar formatting).
  //     Do NOT include explanations or additional text.
  //     Return ONLY the Real-Life Vlogs section.
  //     📌 HTML Output Format:
  //     <p id="content4" style="color: #666666; font-size: 14px; margin: 0;">[Real-Life Vlogs data here]</p><p id="content4-korean" style="color: #b3b0b0; font-size: 12px; margin: 0;"> [Korean Translation here]</p>`
  //   };
  // }

  async generateNewsletter(content) {
    try {
      console.log("🔄 API 요청 중...");
      const results = {};
      
      for (const [key, prompt] of Object.entries(this.prompts)) {
        console.log(`📌 Fetching ${key}...`);
        results[key] = await this.fetchData(prompt,content);
      }

      console.log("✅ API 요청 완료!");
      return results;
    } catch (error) {
      console.error('❌ OpenAI API 요청 실패:', error.response ? error.response.data : error.message);
      return null;
    }
  }

  async fetchData(prompt,content) {
    try {
      const response = await axios.post(
        this.baseUrl,
        {
          model: 'gpt-4-turbo',
          messages: [
            { role: 'system', content: 'You are an AI assistant that refines and structures content for a professional newsletter.' },
            { role: 'user', content: `${prompt}\n\n${content}` },
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

  // async formatNewsletter(content) {
  //   try {
  //     if (!this.prompts) {
  //       throw new Error('❌ 파일에서 읽은 프롬프트가 없습니다.');
  //     }

  //     const response = await axios.post(
  //       this.baseUrl,
  //       {
  //         model: 'gpt-4-turbo',
  //         messages: [
  //           { role: 'system', content: 'You are an AI assistant that refines and structures content for a professional newsletter.' },
  //           { role: 'user', content: `${this.prompt}\n\n${content}` },
  //         ],
  //         max_tokens: 8192,
  //         temperature: 0.7,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${this.apiKey}`,
  //           'Content-Type': 'application/json',
  //         },
  //         timeout: 0, // ✅ 타임아웃 없음 (응답이 끝날 때까지 기다림)
  //       }
  //     );
  //     return response.data.choices[0].message.content;
  //   } catch (error) {
  //     console.error('❌ OpenAI API 요청 실패:', error.response ? error.response.data : error.message);
  //     return null;
  //   }
  // }

}

module.exports = OpenAIAPI;
