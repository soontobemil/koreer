// common utils
const { format } = require('date-fns');
const fs = require('fs');
const path = require('path');

function formatDate(date) {
  return format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
}

function getSubQuery(cols, tbl, where) {
  // 컬럼을 테이블명과 함께 처리 (예: "users"."name")
  const formattedCols = cols.split(',').map(col => `"${tbl}"."${col.trim()}"`).join(', ');

  // 조건을 처리하기 위한 쿼리 빌드
  const whereClause = where ? `WHERE ${Object.keys(where).map(key => `"${tbl}"."${key}" = '${where[key]}'`).join(' AND ')}` : '';

  // 서브쿼리 생성
  return `(
    SELECT ${formattedCols} FROM "${tbl}" ${whereClause}
  )`;
}

function replaceUrl(htmlString, code, newUrl) {
  const parsedUrl = new URL(process.env.API_URL);
  const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}`; // 포트 제외한 URL
  // 동적으로 코드에 맞는 값으로 교체하기 위한 정규식
  const regex = new RegExp(`href=\\\\?"${code}\\\\?"`, 'g');  // code를 이용해 동적 교체

  return htmlString.replace(regex, `href="${baseUrl}:3001${newUrl}"`);
} 

function replaceTitle(htmlString, newTitle) {
  return htmlString.replace(/<title>.*?<\/title>/, `<title>${newTitle}</title>`);
}

function readTextFile(filePath) {
  try {
      const absolutePath = path.resolve(filePath); // 절대 경로 변환
      return fs.readFileSync(absolutePath, 'utf-8'); // ✅ 동기적 파일 읽기
  } catch (error) {
      console.error('❌ 파일 읽기 실패:', error.message);
      return null;
  }
}

function stripCodeBlocks(text) {
  return text
      .replace(/^```html\s*/i, '')   // ✅ "```html" 제거 (문장 맨 앞)
      .replace(/^```/i, '')          // ✅ "```" 만 있는 경우 제거
      .replace(/<\/?code>/gi, '')    // ✅ <code> 또는 </code> 태그 제거
      .trim();                        // ✅ 양쪽 공백 제거
}

function extractTitle(htmlString) {
  const match = htmlString.match(/<title>(.*?)<\/title>/i); // ✅ 정규식으로 <title> 내용 추출
  return match ? match[1].trim() : null; // ✅ 내용이 있으면 반환, 없으면 null
}


module.exports = {
    formatDate,
    getSubQuery,
    replaceUrl,
    replaceTitle,
    readTextFile,
    stripCodeBlocks,
    extractTitle
};
  