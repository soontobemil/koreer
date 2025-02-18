// common utils
const { format } = require('date-fns');

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


module.exports = {
    formatDate,
    getSubQuery
};
  