const answerQuestionRepository = require('../repositories/answerQuestionRepository');

class AnswerQuestionService {
    /**
     * 답변 생성
     */
    async createAnswer(answerData) {
        try {
            // 게시물 존재 확인
            const post = await answerQuestionRepository.findPostById(answerData.post_id);
            if (!post) {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'Post not found'
                };
            }

            // 답변 생성
            const answer = await answerQuestionRepository.createAnswer(answerData);

            return {
                success: true,
                statusCode: 201,
                message: 'Answer submitted successfully',
                data: {
                    id: answer.id,
                    post_id: answer.post_id,
                    answer_content: answer.answer_content,
                    created_at: answer.created_at
                }
            };
        } catch (error) {
            console.error('Error in createAnswer service:', error);
            return {
                success: false,
                statusCode: 500,
                message: 'Failed to create answer',
                error: error.message
            };
        }
    }

    /**
     * 게시물 ID, 사용자 ID로 상태 조회
     */
    async getAnswerByPostIdAndUserId(postId, userId) {
        try {
            // 게시물 존재 확인
            const post = await answerQuestionRepository.findPostById(postId);
            if (!post) {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'Post not found'
                };
            }

            // 답변 조회
            const answers = await answerQuestionRepository.findAnswerByPostIdAndUserId(postId, userId);

            return {
                success: true,
                statusCode: 200,
                message: 'Answers retrieved successfully',
                data: answers
            };
        } catch (error) {
            console.error('Error in getAnswersByPostId service:', error);
            return {
                success: false,
                statusCode: 500,
                message: 'Failed to retrieve answers',
                error: error.message
            };
        }
    }

    /**
     * 유저 ID로 모든 답변 조회
     */
    async getAnswersByUserId(userId, page = 1, limit = 10) {
        try {
            // 페이지네이션 계산
            const offset = (page - 1) * limit;

            // 총 답변 수 및 답변 목록 조회
            const { count: total, rows: answers } = await answerQuestionRepository.findAndCountAnswersByUserId(
                userId,
                offset,
                limit
            );

            if (!answers.length) {
                return {
                    data: [],
                    meta: {
                        total,
                        currentPage: page,
                        totalPages: Math.ceil(total / limit),
                    },
                };
            }

            // 게시물 정보 조회 및 결합
            const answersWithPostInfo = await Promise.all(
                answers.map(async (answer) => {
                    const post = await answerQuestionRepository.findPostById(answer.post_id);
                    return {
                        ...answer.toJSON(),
                        post_title: post ? post.title : null,
                        category: post ? post.category : null
                    };
                })
            );

            // 응답 형식에 맞게 데이터 반환
            return {
                data: answersWithPostInfo,
                meta: {
                    total,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                },
            };
        } catch (error) {
            console.error('Error in getAnswersByUserId service:', error);
            throw new Error('Error fetching answers');
        }
    }

    /**
     * 게시물 ID로 모든 답변 조회
     */
    async getAnswersByPostId(postId) {
        try {
            // 게시물 존재 확인
            const post = await answerQuestionRepository.findPostById(postId);
            if (!post) {
                return {
                    success: false,
                    statusCode: 404,
                    message: 'Post not found'
                };
            }

            // 답변 조회
            const answers = await answerQuestionRepository.findAnswersByPostId(postId);

            return {
                success: true,
                statusCode: 200,
                message: 'Answers retrieved successfully',
                data: answers
            };
        } catch (error) {
            console.error('Error in getAnswersByPostId service:', error);
            return {
                success: false,
                statusCode: 500,
                message: 'Failed to retrieve answers',
                error: error.message
            };
        }
    }
}

module.exports = new AnswerQuestionService();