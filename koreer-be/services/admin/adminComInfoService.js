// services/post.service.js
const AdminComInfoRepository = require('../../repositories/admin/AdminComInfoRepository');
const { AdminComInfoDTO } = require('../../dtos/admin/AdminComInfoDTO');

class AdminComInfoService {
    async createInfo(data) {
        try {
          const info = await AdminComInfoRepository.create(data);
          return info;
        } catch (error) {
          console.log(error);
          throw new Error('Error creating company info');
        }
    }
      
    async getInfos(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;

            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: infos, count: total } = await AdminComInfoRepository.getInfos(offset, limit, req);

            // AdminComInfoDTO 매핑
            const comInfoDTO = infos.map(info => {
                const infoObject = info.toJSON ? info.toJSON() : info; // Sequelize 객체를 일반 객체로 변환

                return new AdminComInfoDTO({
                    ...infoObject, // info 테이블의 모든 데이터
                });
            });

            // 페이지네이션 메타데이터 포함 응답
            return {
                data: comInfoDTO,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error fetching infos:', error);
            throw new Error('Error fetching infos');
        }
    }
    async getInfoById(req) {
        try {
            const id = req.params.id || undefined;
            const info = await AdminComInfoRepository.findById(id);

            const infoObject = info.toJSON ? info.toJSON() : info; // Sequelize 객체를 일반 객체로 변환

            const comInfoDTO = new AdminComInfoDTO(infoObject);

            return {
                data: comInfoDTO
            };

        } catch (error) {
            console.error('Error fetching info:', error);
            throw new Error('Error fetching info');
        }
    }

    async updateInfo(id, updateData) {
        const numericCodeId = Number(id);
        const updated = await AdminComInfoRepository.update(numericCodeId, updateData);
        if (!updated) {
            throw new Error('Company Info not found or update failed');
        }
        const updatedInfo = await AdminComInfoRepository.findById(id);
        const infoObject = updatedInfo.toJSON ? updatedInfo.toJSON() : updatedInfo; // Sequelize 객체를 일반 객체로 변환

        const comInfoDTO = new AdminComInfoDTO(infoObject);

        return {
            data: comInfoDTO
        };
    }

    async deleteInfo(id) {
        const deleted = await AdminComInfoRepository.delete(id);
        if (!deleted) {
            throw new Error('Company Info not found or delete failed');
        }
        return { message: 'Company Info deleted successfully' };
    }

}

module.exports = new AdminComInfoService();
