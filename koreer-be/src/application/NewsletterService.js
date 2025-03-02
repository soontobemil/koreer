const Newsletter = require('../domain/Newsletter');
const fs = require('fs');
const path = require('path');

class NewsletterService {

  async createNewsletter(contents) {
    console.log(contents);
    const filePath = path.resolve(__dirname, '../data/newsletter.html');
    console.log('📌 파일에서 콘텐츠 읽는 중:', filePath);
    // 📌 HTML 템플릿 불러오기
    let templateHtml = fs.readFileSync(filePath, "utf8");
    // 📌 데이터 삽입
    Object.entries(contents).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      templateHtml = templateHtml.replace(new RegExp(`\\$\\{${key}\\}`, "g"), value || "");
    });

    console.log('📌 읽은 콘텐츠 생성 완료!');

    const newsletter = new Newsletter(JSON.stringify(contents),templateHtml);
    return newsletter;
  }
}

module.exports = NewsletterService;
