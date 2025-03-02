// services/post.service.js
const AdminNewsLetterRepository = require('../../repositories/admin/AdminNewsLetterRepository');
const AdminNewsContentsRepository = require('../../repositories/admin/AdminNewsContentsRepository');
const { AdminNewsLetterDTO } = require('../../dtos/admin/AdminNewsLetterDTO');

const PerplexityAPI = require('../../src/infrastructure/PerplexityAPI');
const OpenAIAPI = require('../../src/infrastructure/OpenAIAPI');
const NewsletterService = require('../../src/application/NewsletterService');

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
            const openAIAPI = new OpenAIAPI(process.env.OPENAI_API_KEY);
            const newsletterService = new NewsletterService();

            console.log('🚀 인터뷰 질문 생성 중...');
            const prompt = await openAIAPI.getPrompt('../data/research_prompt.txt');
            const interview_question = await openAIAPI.fetchData(prompt);
            if (interview_question) console.log('✅ 인터뷰 질문 생성 완료!', interview_question);

            console.log('🚀 답변 생성 중...');
            const prompt2 = await openAIAPI.getPrompt('../data/research_prompt2.txt');
            const interview_answer = await openAIAPI.fetchData(`${prompt2}\n\nthe question:\n\n${interview_question}`);
            if (interview_answer) console.log('✅ 인터뷰 답변 생성 완료!', interview_answer);

            console.log('🚀 핫이슈 질문 생성 중...');
            const prompt3 = await openAIAPI.getPrompt('../data/research_prompt3.txt');
            const hotissue_post = await openAIAPI.fetchData(`${prompt3}`);
            if (hotissue_post) console.log('✅ 핫이슈 질문 생성 완료!', hotissue_post);

            const interview = await AdminNewsContentsRepository.create({
                interview_question:interview_question,
                interview_answer:interview_answer,
                hotissue_question:hotissue_post,
                category:'NEWSLETTER',
            });
            console.log(`인터뷰 생성완료`,interview);

            console.log('🚀 뉴스레터 생성 중...');
            const newsletter = await newsletterService.createNewsletter({interview_question:interview_question,hotissue_question:hotissue_post});
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
                content_id:interview.id,
                category:'NEWSLETTER',
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
