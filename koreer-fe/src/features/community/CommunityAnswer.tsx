import {motion} from 'framer-motion';
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Divider,
    IconButton,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import {AccessTime, ArrowBack, Lightbulb, Person, QuestionAnswer, Send,} from '@mui/icons-material';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useCommunityGetter} from '../../features/community/hooks/useCommunityGetter';
import {useCookieFunctions} from "../../components/common/hooks/useCookieFunctions";
import {useCommunityAnswerGetter} from "../../features/community/hooks/useCommunityAnswerGetter";

export function CommunityAnswer() {
    const [answer, setAnswer] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // const { id } = useParams();
    const pathParts = window.location.pathname.split('/');
    const id = Number(pathParts[pathParts.length - 1]);
    const navigate = useNavigate();
    const { getCookie } = useCookieFunctions();

    // 커뮤니티 게시물 가져오기
    const { getCommunityById, post } = useCommunityGetter();
    const { getAnswerById, answerResult} = useCommunityAnswerGetter();

    // 페이지 로드 시 게시물 데이터 가져오기
    useEffect(() => {
        const accessToken = getCookie('accessToken');
        getCommunityById(id).then();
        if (accessToken) {
            getAnswerById({postId:id, token: accessToken}).then();
        }
    }, [id, getCommunityById]);

    const handleSubmitAnswer = async () => {
        const accessToken = getCookie('accessToken');
        if (!accessToken) {
            alert('로그인 후 시도해주세요');
            return;
        }

        if (answer.trim() === '') {
            alert('답변을 작성해주세요.');
            return;
        }

        if (window.confirm('답변을 제출하시겠습니까?')) {
            try {
                setSubmitting(true);
                const response = await fetch(
                    `${process.env.REACT_APP_BASE_URL}/answer-question/answer`,
                    {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            post_id: id,
                            answer_content: answer
                        },)
                    }
                );

                if (response.ok) {
                    alert('답변이 성공적으로 제출되었습니다!');
                    navigate(`/community/detail/${id}`); // Redirect to question detail page
                }
            } catch (err) {
                console.error('Error submitting answer:', err);
                alert('답변 제출에 실패했습니다. 다시 시도해주세요.');
            } finally {
                setSubmitting(false);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* 뒤로가기 버튼 */}
                <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
                    <motion.div whileHover={{ x: -5 }}>
                        <IconButton
                            onClick={() => window.history.back()}
                            sx={{
                                color: 'primary.main',
                                '&:hover': { bgcolor: 'primary.50' }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                    </motion.div>
                    <Typography
                        variant="body2"
                        sx={{ ml: 1, color: 'text.secondary' }}
                    >
                        질문으로 돌아가기
                    </Typography>
                </Box>
                {
                    post && (
                        <>
                            {/* 질문 요약 카드 */}
                            <Paper
                                elevation={0}
                                sx={{
                                    mb: 4,
                                    borderRadius: 3,
                                    overflow: 'hidden',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: 'primary.50',
                                        p: 3,
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Chip
                                            label={post.category}
                                            color="primary"
                                            sx={{
                                                borderRadius: 2,
                                                fontSize: '0.9rem',
                                                fontWeight: 500
                                            }}
                                        />
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <QuestionAnswer sx={{ fontSize: 18, mr: 0.5, color: 'primary.main' }} />
                                            <Typography
                                                variant="body2"
                                                sx={{ fontWeight: 500, color: 'primary.main' }}
                                            >
                                                답변하기
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 700,
                                            color: 'text.primary',
                                            mb: 2,
                                        }}
                                    >
                                        {post.title}
                                    </Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Person sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {post.username}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <AccessTime sx={{ fontSize: 18, mr: 0.5, color: 'text.secondary' }} />
                                            <Typography variant="body2" color="text.secondary">
                                                {post.created_at}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            lineHeight: 1.7,
                                            color: 'text.secondary',
                                            mb: 2,
                                            maxHeight: '120px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 4,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {post.content}
                                    </Typography>

                                    <Button
                                        variant="text"
                                        color="primary"
                                        size="small"
                                        onClick={() => navigate(`/community/detail/${id}`)}
                                        sx={{ fontWeight: 500 }}
                                    >
                                        전체 질문 보기
                                    </Button>
                                </Box>
                            </Paper>

                            {/* 답변 작성 카드 */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        overflow: 'hidden',
                                        border: '1px solid',
                                        borderColor: 'divider',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: 'primary.main',
                                            p: 3,
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 1,
                                        }}
                                    >
                                        <Lightbulb sx={{ color: 'white' }} />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: 'white',
                                            }}
                                        >
                                            내 답변 작성하기
                                        </Typography>
                                    </Box>

                                    <Box sx={{ p: 3 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mb: 3,
                                                color: 'text.secondary',
                                                fontStyle: 'italic',
                                            }}
                                        >
                                            당신의 지식과 경험을 공유해보세요. 상세하고 명확한 답변은 다른 사용자들에게 큰 도움이 됩니다.
                                        </Typography>

                                        <Card
                                            elevation={0}
                                            sx={{
                                                mb: 3,
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 2,
                                            }}
                                        >
                                            <CardContent>
                                                <TextField
                                                    fullWidth
                                                    multiline
                                                    rows={8}
                                                    placeholder="답변 내용을 입력하세요..."
                                                    value={answer}
                                                    onChange={(e) => setAnswer(e.target.value)}
                                                    variant="outlined"
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: 2,
                                                        }
                                                    }}
                                                    disabled={submitting}
                                                />
                                            </CardContent>
                                        </Card>

                                        <Divider sx={{ my: 3 }} />

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                            <Button
                                                variant="text"
                                                sx={{ mr: 2 }}
                                                onClick={() => window.history.back()}
                                                disabled={submitting}
                                            >
                                                취소
                                            </Button>

                                            <motion.div whileHover={{ scale: 1.05 }}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    size="large"
                                                    endIcon={<Send />}
                                                    onClick={handleSubmitAnswer}
                                                    disabled={submitting}
                                                    sx={{
                                                        borderRadius: 2,
                                                        px: 4,
                                                        py: 1.5,
                                                    }}
                                                >
                                                    {submitting ? '제출 중...' : '답변 제출하기'}
                                                </Button>
                                            </motion.div>
                                        </Box>
                                    </Box>
                                </Paper>
                            </motion.div>
                        </>
                    )
                }
            </motion.div>
        </Container>
    );
}