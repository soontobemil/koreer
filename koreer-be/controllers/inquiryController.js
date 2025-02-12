const inquiryService = require("../services/inquiryService");

async function registerInquiry(req, res) {
    try {
        const { name, email, cellphone_number, title, content } = req.body;

        // 필수 필드 검증
        if (!name || !email || !title || !content) {
            return res.status(400).json({
                message: '필수 항목이 누락되었습니다.'
            });
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                message: '올바른 이메일 형식이 아닙니다.'
            });
        }

        const inquiry = await inquiryService.registerInquiry(req.body);
        return res.status(201).json({
            message: '문의가 성공적으로 등록되었습니다.',
            data: inquiry
        });
    } catch (error) {
        console.error('문의 등록 중 에러 발생:', error);
        return res.status(500).json({
            message: '문의 등록 중 오류가 발생했습니다.'
        });
    }
}

module.exports = {
    registerInquiry
};
