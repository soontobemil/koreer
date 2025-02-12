const db = require('../models');

class InquiryService {
    async registerInquiry(inquiryData) {
        try {
            const { name, email, phone_number, title, content } = inquiryData;

            // 데이터 유효성 검증
            if (name.length > 20 || email.length > 20 ||
                (phone_number && phone_number.length > 20) ||
                title.length > 30 || content.length > 200) {
                throw new Error('입력된 데이터가 허용된 길이를 초과했습니다.');
            }

            // 문의 데이터 생성
            const inquiry = await db.Inquiry.create({
                name,
                email,
                phone_number,
                title,
                content
            });

            return {
                id: inquiry.id,
                name: inquiry.name,
                email: inquiry.email,
                phone_number: inquiry.phone_number,
                title: inquiry.title,
                content: inquiry.content,
                created_at: inquiry.created_at
            };
        } catch (error) {
            console.error('문의 등록 서비스 에러:', error);
            throw error;
        }
    }
}

module.exports = new InquiryService();
