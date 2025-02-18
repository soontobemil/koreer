// services/post.service.js
const AdminNewsLetterRepository = require('../../repositories/admin/AdminNewsLetterRepository');
const { AdminNewsLetterDTO } = require('../../dtos/admin/AdminNewsLetterDTO');

class AdminNewsLetterService {
    async createNewsLetter(data) {
        try {
            if(!data.created_by) data.created_by = 71;
            if(data.content) {
                if (typeof data.content !== "string") {
                    data.content = JSON.stringify(data.content);
                }
                data.content = await this.replaceTitle(data.content, data.title);
            } 
            const letter = await AdminNewsLetterRepository.create(data);
            return letter;
        } catch (error) {
            console.log(error);
            throw new Error('Error creating newsletter');
        }
    }
      
    async getNewsLetters(page = 1, limit = 10, req) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;

            // 레포지토리에서 데이터 가져오기
            // todo 리팩토링
            const { rows: letters, count: total } = await AdminNewsLetterRepository.getNewsLetters(offset, limit, req);

            // AdminComInfoDTO 매핑
            const newsLetterDTO = letters.map(letter => {
                const letterObject = letter.toJSON ? letter.toJSON() : letter; // Sequelize 객체를 일반 객체로 변환
                return new AdminNewsLetterDTO(letterObject);
            });

            // 페이지네이션 메타데이터 포함 응답
            return {
                data: newsLetterDTO,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error fetching newsletters:', error);
            throw new Error('Error fetching newsletters');
        }
    }
    async getNewsLetterById(req) {
        try {
            const id = req.params.id || undefined;
            const letter = await AdminNewsLetterRepository.findById(id);

            const letterObject = letter.toJSON ? letter.toJSON() : letter; // Sequelize 객체를 일반 객체로 변환

            const newsLetterDTO = new AdminNewsLetterDTO(letterObject);

            return {
                data: newsLetterDTO
            };

        } catch (error) {
            console.error('Error fetching newsletter:', error);
            throw new Error('Error fetching newsletter');
        }
    }

    async updateNewsLetter(id, updateData) {
        const numericId = Number(id);
        if(!updateData.created_by) updateData.created_by = 71;
        if(updateData.content) {
            if (typeof updateData.content !== "string") {
                updateData.content = JSON.stringify(updateData.content);
            }
            updateData.content = await this.replaceTitle(updateData.content, updateData.title);
        } 
        const updated = await AdminNewsLetterRepository.update(numericId, updateData);
        if (!updated) {
            throw new Error('News Letter not found or update failed');
        }
        const updatedLetter = await AdminNewsLetterRepository.findById(id);
        const letterObject = updatedLetter.toJSON ? updatedLetter.toJSON() : updatedLetter; // Sequelize 객체를 일반 객체로 변환

        const newsLetterDTO = new AdminNewsLetterDTO(letterObject);

        return {
            data: newsLetterDTO
        };
    }

    async deleteNewsLetter(id) {
        const deleted = await AdminNewsLetterRepository.delete(id);
        if (!deleted) {
            throw new Error('News Letter not found or delete failed');
        }
        return { message: 'News Letter deleted successfully' };
    }

    async replaceTitle(htmlString, newTitle) {
        return htmlString.replace(/<title>.*?<\/title>/, `<title>${newTitle}</title>`);
    }
}

module.exports = new AdminNewsLetterService();
