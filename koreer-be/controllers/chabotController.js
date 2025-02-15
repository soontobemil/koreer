const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // .env 파일에 키 설정
});

async function getQuery(req, res) {
    try {
        const { query } = req.params;

        console.log('query : ',query)
        if (!query) {
            return res.status(400).json({
                message: 'Query parameter is required'
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "당신은 해외 IT 취업을 돕는 Koreer 서비스의 챗봇입니다. 해외 취업, 기술 면접, 코딩 테스트, 비자, 해외 생활 등에 대해 친절하고 전문적으로 답변해주세요."
                },
                {
                    role: "user",
                    content: query
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const answer = completion.choices[0].message.content;

        res.status(200).json({
            success: true,
            answer
        });

    } catch (error) {
        console.error('ChatGPT API Error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing your request',
            error: error.message
        });
    }
}

module.exports = {
    getQuery
};