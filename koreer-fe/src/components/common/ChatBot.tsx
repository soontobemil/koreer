import React, { useState, useRef, useEffect } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    IconButton, 
    Collapse,
    Zoom,
    TextField,
    Button,
    Chip,
    CircularProgress,
    Link
} from '@mui/material';
import { 
    Chat as ChatIcon,
    Close as CloseIcon,
    Send as SendIcon,
    ArrowForward,
    Category,
    School,
    Work,
    Paid,
    Groups
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    type?: 'text' | 'suggestions' | 'links';
    suggestions?: string[];
    links?: Array<{
        text: string;
        url: string;
    }>;
}

// Enhanced knowledge base
const knowledgeBase = {
    visa: {
        usa: {
            text: "미국 취업 비자 종류와 정보:\n\n• H-1B 비자: 전문직 취업 비자\n• L-1 비자: 주재원 비자\n• F-1 OPT: 학생 실무 연수\n• E-2 비자: 투자자 비자\n\n자세한 내용은 비자 가이드를 확인하세요.",
            links: [
                { text: "미국 비자 가이드", url: "/visa-info/usa" },
                { text: "비자별 상세 정보", url: "/visa-info/usa#types" }
            ]
        },
        canada: {
            text: "캐나다 취업 비자 종류와 정보:\n\n• Work Permit\n• Express Entry\n• Provincial Nominee\n• Post-Graduate Work Permit\n\n자세한 내용은 비자 가이드를 확인하세요.",
            links: [
                { text: "캐나다 비자 가이드", url: "/visa-info/canada" },
                { text: "비자별 상세 정보", url: "/visa-info/canada#types" }
            ]
        }
    },
    interview: {
        technical: {
            text: "기술 면접 준비 가이드:\n\n• 알고리즘 & 자료구조\n• 시스템 디자인\n• 코딩 테스트\n• 실제 프로젝트 경험\n\n실제 면접 사례와 팁을 확인하세요.",
            links: [
                { text: "기술 면접 가이드", url: "/interview-guide/technical" },
                { text: "코딩 테스트 준비", url: "/interview-guide/coding" }
            ]
        },
        behavioral: {
            text: "인성 면접 준비 가이드:\n\n• STAR 방법론\n• 자주 나오는 질문\n• 문화적 차이 이해\n• 영어 면접 팁\n\n실제 사례를 통해 배워보세요.",
            links: [
                { text: "인성 면접 가이드", url: "/interview-guide/behavioral" },
                { text: "영어 면접 특강", url: "/interview-guide/english" }
            ]
        }
    },
    salary: {
        usa: {
            text: "미국 주요 도시 연봉 정보:\n\n• 실리콘밸리: $150K-$250K\n• 뉴욕: $130K-$220K\n• 시애틀: $140K-$230K\n• 보스턴: $120K-$200K\n\n포지션별 상세 데이터 확인하기",
            links: [
                { text: "미국 연봉 정보", url: "/salary-info/usa" },
                { text: "도시별 생활비", url: "/life-info/usa" }
            ]
        },
        canada: {
            text: "캐나다 주요 도시 연봉 정보:\n\n• 토론토: $90K-$150K\n• 밴쿠버: $85K-$140K\n• 몬트리올: $80K-$130K\n• 오타와: $85K-$135K\n\n포지션별 상세 데이터 확인하기",
            links: [
                { text: "캐나다 연봉 정보", url: "/salary-info/canada" },
                { text: "도시별 생활비", url: "/life-info/canada" }
            ]
        }
    },
    community: {
        general: {
            text: "커뮤니티에서 다양한 정보를 공유하세요:\n\n• 취업 성공 사례\n• 현지 생활 정보\n• 스터디 그룹\n• 네트워킹\n\n함께 성장하는 커뮤니티에 참여하세요.",
            links: [
                { text: "커뮤니티 바로가기", url: "/community" },
                { text: "취업 팁 공유", url: "/tips" }
            ]
        }
    }
};

const suggestionCategories = [
    {
        icon: <School />,
        text: "비자 정보",
        suggestions: ["미국 비자 종류가 궁금해요", "캐나다 비자 정보 알려주세요", "비자 준비는 어떻게 하나요?"]
    },
    {
        icon: <Work />,
        text: "면접 준비",
        suggestions: ["기술 면접은 어떻게 준비하나요?", "인성 면접 팁 알려주세요", "코딩 테스트 준비하기"]
    },
    {
        icon: <Paid />,
        text: "연봉 정보",
        suggestions: ["미국 개발자 연봉이 궁금해요", "캐나다 연봉 정보 알려주세요", "도시별 생활비는 어떤가요?"]
    },
    {
        icon: <Groups />,
        text: "커뮤니티",
        suggestions: ["취업 성공 사례가 궁금해요", "스터디 그룹 찾기", "현지 생활 정보"]
    }
];

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '안녕하세요! Koreer 도우미입니다. 해외 취업과 관련하여 어떤 도움이 필요하신가요?',
            sender: 'bot',
            timestamp: new Date(),
            type: 'suggestions',
            suggestions: suggestionCategories.map(cat => cat.text)
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const processMessage = (text: string): { response: string; links?: Array<{ text: string; url: string; }> } => {
        text = text.toLowerCase();
        
        // Visa related queries
        if (text.includes('비자')) {
            if (text.includes('미국')) {
                return {
                    response: knowledgeBase.visa.usa.text,
                    links: knowledgeBase.visa.usa.links
                };
            }
            if (text.includes('캐나다')) {
                return {
                    response: knowledgeBase.visa.canada.text,
                    links: knowledgeBase.visa.canada.links
                };
            }
            // General visa query
            return {
                response: "비자 정보를 확인하시려는 국가를 선택해주세요:",
                links: [
                    { text: "미국 비자 정보", url: "/visa-info/usa" },
                    { text: "캐나다 비자 정보", url: "/visa-info/canada" }
                ]
            };
        }

        // Interview related queries
        if (text.includes('면접') || text.includes('인터뷰')) {
            if (text.includes('기술') || text.includes('코딩')) {
                return {
                    response: knowledgeBase.interview.technical.text,
                    links: knowledgeBase.interview.technical.links
                };
            }
            if (text.includes('인성') || text.includes('행동')) {
                return {
                    response: knowledgeBase.interview.behavioral.text,
                    links: knowledgeBase.interview.behavioral.links
                };
            }
            // General interview query
            return {
                response: "면접 준비 가이드를 선택해주세요:",
                links: [
                    { text: "기술 면접 준비", url: "/interview-guide/technical" },
                    { text: "인성 면접 준비", url: "/interview-guide/behavioral" },
                    { text: "코딩 테스트 준비", url: "/interview-guide/coding" }
                ]
            };
        }

        // Salary related queries
        if (text.includes('연봉') || text.includes('급여') || text.includes('페이')) {
            if (text.includes('미국')) {
                return {
                    response: knowledgeBase.salary.usa.text,
                    links: knowledgeBase.salary.usa.links
                };
            }
            if (text.includes('캐나다')) {
                return {
                    response: knowledgeBase.salary.canada.text,
                    links: knowledgeBase.salary.canada.links
                };
            }
            // General salary query
            return {
                response: "연봉 정보를 확인하시려는 국가를 선택해주세요:",
                links: [
                    { text: "미국 연봉 정보", url: "/salary-info/usa" },
                    { text: "캐나다 연봉 정보", url: "/salary-info/canada" }
                ]
            };
        }

        // Community related queries
        if (text.includes('커뮤니티') || text.includes('스터디') || text.includes('정보공유')) {
            return {
                response: knowledgeBase.community.general.text,
                links: knowledgeBase.community.general.links
            };
        }

        // Default response with main categories
        return {
            response: "원하시는 정보의 카테고리를 선택해주세요:",
            links: [
                { text: "비자 가이드", url: "/visa-info/usa" },
                { text: "면접 준비", url: "/interview-guide/technical" },
                { text: "연봉 정보", url: "/salary-info/usa" },
                { text: "커뮤니티", url: "/community" }
            ]
        };
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate typing delay
        setTimeout(() => {
            const processed = processMessage(input);
            
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: processed.response,
                sender: 'bot',
                timestamp: new Date(),
                type: processed.links ? 'links' : 'text',
                links: processed.links
            };

            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInput(suggestion);
        handleSend();
    };

    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                zIndex: 1000,
            }}
        >
            <Collapse in={isOpen} timeout="auto">
                <Paper
                    elevation={3}
                    sx={{
                        position: 'absolute',
                        bottom: 80,
                        right: 0,
                        width: 380,
                        height: 600,
                        borderRadius: 3,
                        overflow: 'hidden',
                        bgcolor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)'
                    }}
                >
                    <Box
                        sx={{
                            p: 2,
                            bgcolor: 'primary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <ChatIcon />
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Koreer 도우미
                        </Typography>
                        <IconButton size="small" onClick={handleToggle} sx={{ color: 'white' }}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Box 
                        ref={chatRef}
                        sx={{ 
                            p: 2, 
                            flexGrow: 1, 
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        {messages.map((message) => (
                            <Box
                                key={message.id}
                                sx={{
                                    alignSelf: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%'
                                }}
                            >
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                                        color: message.sender === 'user' ? 'white' : 'text.primary',
                                        borderRadius: 2,
                                        borderTopLeftRadius: message.sender === 'user' ? 2 : 0,
                                        borderTopRightRadius: message.sender === 'user' ? 0 : 2
                                    }}
                                >
                                    <Typography 
                                        variant="body1"
                                        sx={{ 
                                            whiteSpace: 'pre-wrap',
                                            lineHeight: 1.6
                                        }}
                                    >
                                        {message.text}
                                    </Typography>

                                    {message.type === 'suggestions' && (
                                        <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                            {suggestionCategories.map((category, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outlined"
                                                    size="small"
                                                    startIcon={category.icon}
                                                    onClick={() => handleSuggestionClick(category.suggestions[0])}
                                                    sx={{
                                                        borderRadius: 4,
                                                        textTransform: 'none',
                                                        bgcolor: 'background.paper'
                                                    }}
                                                >
                                                    {category.text}
                                                </Button>
                                            ))}
                                        </Box>
                                    )}

                                    {message.type === 'links' && message.links && (
                                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                                            {message.links.map((link, index) => (
                                                <Button
                                                    key={index}
                                                    variant="outlined"
                                                    size="small"
                                                    endIcon={<ArrowForward />}
                                                    onClick={() => navigate(link.url)}
                                                    sx={{
                                                        borderRadius: 2,
                                                        textTransform: 'none',
                                                        justifyContent: 'flex-start',
                                                        bgcolor: 'background.paper'
                                                    }}
                                                >
                                                    {link.text}
                                                </Button>
                                            ))}
                                        </Box>
                                    )}
                                </Paper>
                            </Box>
                        ))}
                        {isTyping && (
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', pl: 1 }}>
                                <CircularProgress size={20} />
                                <Typography variant="body2" color="text.secondary">
                                    답변 작성 중...
                                </Typography>
                            </Box>
                        )}
                    </Box>

                    <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="질문을 입력하세요..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                multiline
                                maxRows={3}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3
                                    }
                                }}
                            />
                            <IconButton 
                                color="primary"
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: 'primary.dark'
                                    },
                                    '&.Mui-disabled': {
                                        bgcolor: 'action.disabledBackground',
                                        color: 'action.disabled'
                                    }
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Collapse>

            <Zoom in={true}>
                <IconButton
                    onClick={handleToggle}
                    sx={{
                        width: 56,
                        height: 56,
                        bgcolor: 'primary.main',
                        color: 'white',
                        boxShadow: 3,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                    }}
                >
                    {isOpen ? <CloseIcon /> : <ChatIcon />}
                </IconButton>
            </Zoom>
        </Box>
    );
} 