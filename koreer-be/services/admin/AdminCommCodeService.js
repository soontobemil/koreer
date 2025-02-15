// services/post.service.js
const AdminCommCodeRepository = require('../../repositories/admin/AdminCommCodeRepository');
const { AdminCommCodeDTO } = require('../../dtos/admin/AdminCommCodeDTO');
const {redisClient} = require('../../config/redisClient'); // 전역 Redis 클라이언트 사용

class AdminCommCodeService {
    async createCode(data) {
        try {
            const code = await AdminCommCodeRepository.createCode(data);
            // 캐시 무효화 메시지 전송
            await redisClient.publish('CACHE_INVALIDATION', `common_code:${data.group_code}`);

            return code;
        } catch (error) {
          console.log(error);
          throw new Error('Error creating code');
        }
    }
      
    async getCodes(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;

            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: codes, count: total } = await AdminCommCodeRepository.getCodes(offset, limit, req);

            // AdminCommCodeDTO 매핑
            const codesDTO = codes.map(code => {
                const codeObject = code.toJSON ? code.toJSON() : code; // Sequelize 객체를 일반 객체로 변환

                return new AdminCommCodeDTO({
                    ...codeObject, // code 테이블의 모든 데이터
                });
            });

            // 페이지네이션 메타데이터 포함 응답
            return {
                data: codesDTO,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error fetching codes:', error);
            throw new Error('Error fetching codes');
        }
    }
    async getCodeByGroupCode(req) {
        try {
            const codes = await AdminCommCodeRepository.getCodeByGroupCode(req);

            const codesDTO = codes.map(code => {
                const codeObject = code.toJSON ? code.toJSON() : code; // Sequelize 객체를 일반 객체로 변환

                return new AdminCommCodeDTO({
                    ...codeObject, // code 테이블의 모든 데이터
                });
            });


            return {
                data: codesDTO
            };
        } catch (error) {
            console.error('Error fetching codes:', error);
            throw new Error('Error fetching codes');
        }
    }

    async updateCode(id, updateData) {
        const numericCodeId = Number(id);
        const [updatedCnt1] = await AdminCommCodeRepository.updateCode(numericCodeId, updateData);
        if (updatedCnt1 === 0) {
            throw new Error('Code not found or update failed');
        }
        // 캐시 무효화 메시지 전송
        await redisClient.publish('CACHE_INVALIDATION', `common_code:${updateData.group_code}`);

        const updatedCode = await AdminCommCodeRepository.findById(id);
        const codeObject = updatedCode.toJSON ? updatedCode.toJSON() : updatedCode; // Sequelize 객체를 일반 객체로 변환

        // AdminUserDTO에 userInfoDTO 추가
        const codeDTO = new AdminCommCodeDTO(codeObject);

        return {
            data: codeDTO
        };
    }

    async deleteCode(id) {
        const deletedCode = await AdminCommCodeRepository.findById(id);
        const deleted = await AdminCommCodeRepository.delete(id);
        if (!deleted) {
            throw new Error('Code not found or delete failed');
        }
        // 캐시 무효화 메시지 전송
        await redisClient.publish('CACHE_INVALIDATION', `common_code:${deletedCode.group_code}`);

        return { message: 'Code deleted successfully' };
    }

}

module.exports = new AdminCommCodeService();
