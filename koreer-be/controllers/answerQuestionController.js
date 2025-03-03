const answerQuestionService = require('../services/answerQuestionService');
const {getUserInfoInToken} = require("../src/Auth");

/**
 * 답변 생성
 */
async function postAnswer(req, res) {
    try {
        const { post_id, answer_content } = req.body;

        // 입력 유효성 검사
        if (!post_id || !answer_content) {
            return res.status(400).json({
                success: false,
                message: 'Post ID and answer content are required'
            });
        }

        const userInfo = getUserInfoInToken(req);
        console.log('userInfo : ', userInfo)

        // 서비스 호출하여 답변 생성
        const answerData = {
            user_id: userInfo.id, // 인증 미들웨어에서 제공된 정보
            user_email: userInfo.user_email, // 인증 미들웨어에서 제공된 정보
            post_id,
            answer_content
        };

        const result = await answerQuestionService.createAnswer(answerData);

        // 서비스 결과에 따라 응답 반환
        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data,
            error: result.error
        });
    } catch (error) {
        console.error('Error in postAnswer controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

/**
 * 게시물 ID, 유저 ID로 상세 내역 조회
 */
async function getAnswersByPostIdAndUserId(req, res) {
    try {
        const postId = req.params.id;
        const userInfo = getUserInfoInToken(req);

        if (!postId) {
            return res.status(400).json({
                success: false,
                message: 'Post ID is required'
            });
        }

        if (!userInfo) {
            return res.status(400).json({
                success: false,
                message: 'User has to be Login'
            });
        }

        const result = await answerQuestionService.getAnswerByPostIdAndUserId(postId, userInfo.id);

        return res.status(result.statusCode).json({
            success: result.success,
            message: result.message,
            data: result.data,
            error: result.error
        });
    } catch (error) {
        console.error('Error in getAnswersByPostId controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

/**
 * 유저 ID로 모든 답변 조회
 */
async function getAnswersByUserId(req, res) {
    try {
        const userInfo = getUserInfoInToken(req);

        if (!userInfo) {
            return res.status(400).json({
                success: false,
                message: 'User has to be Login'
            });
        }
        const { page = 1, limit = 10 } = req.query;

        // 서비스 호출
        const result = await answerQuestionService.getAnswersByUserId(
            userInfo.id,
            Number(page),
            Number(limit)
        );

        // 응답 반환
        res.status(200).json(result);

        // const result = await answerQuestionService.getAnswersByUserId(userInfo.id);
        //
        // return res.status(result.statusCode).json({
        //     success: result.success,
        //     message: result.message,
        //     data: result.data,
        //     error: result.error
        // });
    } catch (error) {
        console.error('Error in getAnswersByPostId controller:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
}

module.exports = {
    postAnswer,
    getAnswersByPostIdAndUserId,
    getAnswersByUserId
};