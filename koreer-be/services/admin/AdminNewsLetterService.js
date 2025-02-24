// services/post.service.js
const AdminNewsLetterRepository = require('../../repositories/admin/AdminNewsLetterRepository');
const { AdminNewsLetterDTO } = require('../../dtos/admin/AdminNewsLetterDTO');

const PerplexityAPI = require('../../src/infrastructure/PerplexityAPI');
const OpenAIAPI = require('../../src/infrastructure/OpenAIAPI');
const NewsletterService = require('../../src/application/NewsletterService');

const perplexityAPI = new PerplexityAPI(process.env.PERPLEXITY_API_KEY);
const openAIAPI = new OpenAIAPI(process.env.OPENAI_API_KEY);
const newsletterService = new NewsletterService(perplexityAPI, openAIAPI);

const utils = require('@common/utils');
const path = require('path');

class AdminNewsLetterService {
    // async createNewsLetter(data) {
    //     try {
    //         if(!data.created_by) data.created_by = 71;
    //         if(data.content) {
    //             if (typeof data.content !== "string") {
    //                 data.content = JSON.stringify(data.content);
    //             }
    //             data.content = utils.replaceTitle(data.content, data.title);
    //         } 
    //         const letter = await AdminNewsLetterRepository.create(data);
    //         return letter;
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error('Error creating newsletter');
    //     }
    // }
      
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
            updateData.content = utils.replaceTitle(updateData.content, updateData.title);
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

    async createNewsLetter(req) {
        try {
            await newsletterService.init(); // ✅ 반드시 먼저 초기화 실행
            console.log('🚀 뉴스레터 생성 중...');
            const newsletter = await newsletterService.createNewsletter();
            if (newsletter) console.log('✅ 뉴스레터 생성 완료!', newsletter);

             // ✅ 한국 시간(KST) 기준으로 +1일 추가
            const today = new Date();
            today.setDate(today.getDate() + 1);
            today.setHours(0, 0, 0, 0);  // 자정으로 시간을 맞춰줍니다.
            const localDate = today.toLocaleDateString('en-CA');  // 'en-CA' 형식은 YYYY-MM-DD 형식

            const title = utils.extractTitle(newsletter.formattedContent) ? utils.extractTitle(newsletter.formattedContent) : `${localDate} 일자 뉴스레터 D-1`;
            const content = utils.stripCodeBlocks(newsletter.formattedContent);
            const letter = await AdminNewsLetterRepository.create({
                title:title,
                content:content,
                research_prompt:newsletterService.perplexityAPI.prompt,
                format_prompt:newsletterService.openAIAPI.prompt,
                category:'NEWSLETTER',
                post_category:'NEWSLETTER'
            });
            console.log(`${localDate} 일자 뉴스레터 D-1 생성완료`);
            return letter;
        } catch (error) {
            console.error('❌ 뉴스레터 저장 실패:', error);
            throw new Error(`Database Insert Error: ${error.message}`);
        }
    }
}

module.exports = new AdminNewsLetterService();
