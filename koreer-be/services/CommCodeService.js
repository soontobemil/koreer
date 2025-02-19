const {redisClient} = require('../config/redisClient'); // 전역 Redis 클라이언트 사용
const db = require('../models');

const { CommCodeDTO } = require('../dtos/CommCodeDTO');

class CommCodeService {
    static async getCommonCodes(groupCode = null) {
        const cacheKey = groupCode ? `common_code:${groupCode}` : `common_code:all`;
    
        try {
            // Redis에서 캐시된 데이터 가져오기
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData).map(code => new CommCodeDTO(code));
            }
    
            // DB 조회 조건 설정 (groupCode가 없으면 전체 조회)
            const whereCondition = groupCode ? { group_code: groupCode } : {}; 
    
            // DB 조회
            const codes = await db.CommonCode.findAll({
                where: whereCondition,
                attributes: ['group_code', 'code', 'code_name'],
                order: [['sort_order', 'ASC']],
            });
    
            // Redis에 저장 (1시간 캐시 유지)
            await redisClient.set(cacheKey, JSON.stringify(codes), 'EX', 3600);
            return codes.map(code => new CommCodeDTO(code.toJSON ? code.toJSON() : code));
        } catch (error) {
            console.error('Redis Error:', error);
            throw new Error('공통 코드 조회 실패');
        }
    }    
}

// 정적 메소드는 클래스 export
module.exports = CommCodeService;
