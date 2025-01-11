import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Box,
    Chip,
    Autocomplete,
    Divider, Snackbar, Alert,
} from '@mui/material';
import {SubmitStatus, UserInfoDTO} from "../../types/userInfo";

interface UserInfoFormData {
    school: string;
    major: string;
    graduationYear: string;
    location: string;
    desiredCountry: string;
    skills: string[];
    interests: string[];
    introduction: string;
    githubUrl?: string;
    portfolioUrl?: string;
}

// 기술 스택 예시 데이터
const skillSuggestions = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Express',
    'Python', 'Django', 'FastAPI', 'Java', 'Spring Boot',
    'TypeScript', 'JavaScript', 'PHP', 'Laravel',
    'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'AWS', 'Docker', 'Kubernetes', 'Jenkins',
    'Git', 'GitHub Actions', 'Terraform'
];

// 관심 분야 예시 데이터
const interestSuggestions = [
    'Frontend Development', 'Backend Development', 'DevOps',
    'Cloud Computing', 'Mobile Development', 'AI/ML',
    'Data Science', 'Blockchain', 'Cybersecurity',
    'UI/UX Design', 'Game Development', 'IoT',
    'Fintech', 'E-commerce', 'Healthcare Tech'
];

// 국가 데이터
const countries = ['미국', '캐나다', '일본', '동남아', '유럽'];

export function UserInfo() {
    const [formData, setFormData] = useState<UserInfoFormData>({
        school: '',
        major: '',
        graduationYear: '',
        location: '',
        desiredCountry: '',
        skills: [],
        interests: [],
        introduction: '',
        githubUrl: '',
        portfolioUrl: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSkillsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
        setFormData(prev => ({
            ...prev,
            skills: newValue
        }));
    };

    const handleInterestsChange = (_event: React.SyntheticEvent, newValue: string[]) => {
        setFormData(prev => ({
            ...prev,
            interests: newValue
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitStatus('loading');

        try {
            // form 데이터를 DTO 형식으로 변환
            const userInfoDTO: UserInfoDTO = {
                school: formData.school,
                major: formData.major,
                graduation_year: formData.graduationYear,
                location: formData.location,
                desired_country: formData.desiredCountry,
                skills: formData.skills,
                interests: formData.interests,
                introduction: formData.introduction,
                github_url: formData.githubUrl || null,
                portfolio_url: formData.portfolioUrl || null,
                user_id: "1" // TODO: 실제 사용자 ID로 변경 필요
            };

            const response = await fetch('http://localhost:3000/user-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userInfoDTO)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || '서버 에러가 발생했습니다.');
            }

            setSubmitStatus('success');
            setShowSnackbar(true);
            // 성공 후 추가 처리 (예: 다른 페이지로 이동)
            // navigate('/profile');

        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.');
            setSubmitStatus('error');
            setShowSnackbar(true);
        }
    };

    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showSnackbar, setShowSnackbar] = useState(false);

    const renderSnackbar = () => (
        <>
            <Snackbar
                open={showSnackbar && submitStatus === 'success'}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    추가 정보가 성공적으로 저장되었습니다!
                </Alert>
            </Snackbar>
            <Snackbar
                open={showSnackbar && submitStatus === 'error'}
                autoHideDuration={6000}
                onClose={() => setShowSnackbar(false)}
            >
                <Alert
                    onClose={() => setShowSnackbar(false)}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Paper
                elevation={2}
                sx={{
                    p: 3,
                    mb: 4,
                    background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                    color: 'white',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
            >
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    추가 정보를 입력해주세요!
                </Typography>
                <Typography variant="subtitle1">
                    회원님의 정보를 입력하여 프로필을 완성해주세요.
                </Typography>
            </Paper>

            <Paper
                elevation={2}
                sx={{
                    borderRadius: '16px',
                    p: 4,
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.05)'
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        {/* 기본 정보 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary">
                                학교 및 기본 정보
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="학교"
                                name="school"
                                value={formData.school}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                                sx={{ backgroundColor: 'white' }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="전공"
                                name="major"
                                value={formData.major}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="졸업년도"
                                name="graduationYear"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                                placeholder="YYYY"
                                required
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="현재 거주지"
                                name="location"
                                value={formData.location}
                                onChange={handleInputChange}
                                required
                                placeholder="예) 서울특별시 강남구"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={countries}
                                value={formData.desiredCountry}
                                onChange={(_, newValue) => {
                                    setFormData(prev => ({
                                        ...prev,
                                        desiredCountry: newValue || ''
                                    }));
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="희망 취업 국가"
                                        required
                                        placeholder="국가를 선택해주세요"
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 기술 스택 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                                기술 스택
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                현재 보유하고 있는 기술을 선택해주세요
                            </Typography>
                            <Autocomplete
                                multiple
                                options={skillSuggestions}
                                value={formData.skills}
                                onChange={handleSkillsChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            label={option}
                                            color="primary"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: '8px',
                                                '& .MuiChip-label': { px: 2 }
                                            }}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="기술을 검색하세요"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 관심 분야 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                                관심 분야
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                관심있는 분야를 선택해주세요
                            </Typography>
                            <Autocomplete
                                multiple
                                options={interestSuggestions}
                                value={formData.interests}
                                onChange={handleInterestsChange}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            {...getTagProps({ index })}
                                            label={option}
                                            color="primary"
                                            variant="outlined"
                                            sx={{
                                                borderRadius: '8px',
                                                '& .MuiChip-label': { px: 2 }
                                            }}
                                        />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        placeholder="관심 분야를 검색하세요"
                                    />
                                )}
                            />
                        </Grid>

                        {/* 추가 정보 섹션 */}
                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mt: 2 }}>
                                추가 정보
                            </Typography>
                            <Divider sx={{ mt: 1, mb: 3 }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                label="자기소개"
                                name="introduction"
                                value={formData.introduction}
                                onChange={handleInputChange}
                                required
                                variant="outlined"
                                placeholder="자신을 소개해주세요"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="GitHub URL"
                                name="githubUrl"
                                value={formData.githubUrl}
                                onChange={handleInputChange}
                                placeholder="https://github.com/username"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="포트폴리오 URL"
                                name="portfolioUrl"
                                value={formData.portfolioUrl}
                                onChange={handleInputChange}
                                placeholder="https://your-portfolio.com"
                                variant="outlined"
                            />
                        </Grid>
                    </Grid>

                    <Box sx={{ mt: 6 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                py: 2,
                                borderRadius: '12px',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                                '&:hover': {
                                    background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
                                },
                                boxShadow: '0 4px 16px rgba(21, 101, 192, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            저장하기
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Paper
                elevation={1}
                sx={{
                    mt: 3,
                    p: 3,
                    bgcolor: '#f8f9fa',
                    borderRadius: '12px',
                    border: '1px solid #e0e0e0'
                }}
            >
                <Typography variant="subtitle2" color="text.secondary">
                    * 필수 입력 정보: 학교, 전공, 졸업년도, 거주지, 희망 취업 국가, 자기소개
                </Typography>
            </Paper>
            {renderSnackbar()}
        </Container>
    );
}