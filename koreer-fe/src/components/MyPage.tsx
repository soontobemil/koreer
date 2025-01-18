import { motion } from 'framer-motion';
import {
    Container,
    Paper,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Box,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Chip,
} from '@mui/material';
import {
    Person,
    Work,
    LocationOn,
    Email,
    CalendarMonth,
    Settings
} from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { ComponentHelmet } from "../features/common/ComponentHelmet";
import {ApiResponse, UserInfoDTO} from '@/types/userInfo';
import { UserDTO } from '@/types/auth';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

export function MyPage() {
    const [tabValue, setTabValue] = useState(0);
    const [userInfo, setUserInfo] = useState<UserInfoDTO | null>(null);
    const [user, setUser] = useState<UserDTO | null>(null);

    // 유저 정보 및 추가 정보 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 유저 정보 가져오기
                const userResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/users/current-user`, {
                    credentials: 'include'
                });
                const userData = await userResponse.json();
                setUser(userData.data);

                // 추가 정보 가져오기
                const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user-info/${userData.data.id}`, {
                    credentials: 'include'
                });

                const userInfoData: ApiResponse<UserInfoDTO> = await response.json();

                if (!response.ok) {
                    throw new Error(userInfoData.error || '유저 정보를 가져오는데 실패했습니다.');
                }

                setUserInfo(userInfoData.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // JSON 문자열로 저장된 배열 데이터 파싱
    const skills = userInfo?.skills || [];
    const interests = userInfo?.interests || [];

    // 재직상태에 따른 추가 정보 표시 여부
    const isEmployed = userInfo?.employment_status === 'employed';

    // 고용상태 한글 변환
    const employmentStatusKorean = {
        'employed': '직장인',
        'student': '학생'
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* 프로필 헤더 */}
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        mb: 4,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        color: 'white',
                        borderRadius: 2
                    }}
                >
                    <Grid container spacing={3} alignItems="center">
                        <Grid item>
                            <motion.div whileHover={{ scale: 1.1 }}>
                                <Avatar
                                    sx={{ width: 100, height: 100, border: '3px solid white' }}
                                >
                                    {user?.username}
                                </Avatar>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant="h4" gutterBottom>
                                {user?.username}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm="auto">
                                    <Box display="flex" alignItems="center">
                                        <Email sx={{ mr: 1 }} />
                                        {user?.user_email}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Box display="flex" alignItems="center">
                                        <LocationOn sx={{ mr: 1 }} />
                                        {userInfo?.location}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                {/* 탭 메뉴 */}
                <Paper elevation={0} sx={{ borderRadius: 2 }}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        centered
                        sx={{ borderBottom: 1, borderColor: 'divider' }}
                    >
                        <Tab icon={<Person />} label="기본 정보" />
                        <Tab icon={<Work />} label="경력 정보" />
                        <Tab icon={<Settings />} label="설정" />
                    </Tabs>

                    {/* 기본 정보 탭 */}
                    <TabPanel value={tabValue} index={0}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Card elevation={0} sx={{ height: '100%' }}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            기본 정보
                                        </Typography>
                                        <List>
                                            <ListItem>
                                                <ListItemText
                                                    primary="재직 상태"
                                                    secondary={employmentStatusKorean[userInfo?.employment_status as keyof typeof employmentStatusKorean]}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="생년월일"
                                                    secondary={userInfo?.birth_date}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="현재 거주지"
                                                    secondary={userInfo?.location}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="희망 취업 국가"
                                                    secondary={userInfo?.desired_country}
                                                />
                                            </ListItem>
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            보유 기술
                                        </Typography>
                                        <Box sx={{ mb: 3 }}>
                                            {skills.map((skill: string) => (
                                                <Chip
                                                    key={skill}
                                                    label={skill}
                                                    sx={{ m: 0.5 }}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            관심 분야
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            {interests.map((interest: string) => (
                                                <Chip
                                                    key={interest}
                                                    label={interest}
                                                    sx={{ m: 0.5 }}
                                                    color="secondary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>

                    {/* 경력 정보 탭 */}
                    <TabPanel value={tabValue} index={1}>
                        <Card elevation={0}>
                            <CardContent>
                                {isEmployed ? (
                                    <List>
                                        <ListItem>
                                            <ListItemText
                                                primary="경력"
                                                secondary={userInfo?.years_of_experience}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="연봉 수준"
                                                secondary={userInfo?.salary_range}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText
                                                primary="선호 근무 형태"
                                                secondary={userInfo?.work_style}
                                            />
                                        </ListItem>
                                    </List>
                                ) : (
                                    <Typography variant="body1" color="text.secondary">
                                        학생 회원은 경력 정보가 제공되지 않습니다.
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </TabPanel>

                    {/* 설정 탭 */}
                    <TabPanel value={tabValue} index={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            외부 링크
                                        </Typography>
                                        <List>
                                            {userInfo?.githubUrl && (
                                                <ListItem>
                                                    <ListItemText
                                                        primary="GitHub"
                                                        secondary={userInfo.githubUrl}
                                                    />
                                                </ListItem>
                                            )}
                                            {userInfo?.portfolioUrl && (
                                                <ListItem>
                                                    <ListItemText
                                                        primary="포트폴리오"
                                                        secondary={userInfo.portfolioUrl}
                                                    />
                                                </ListItem>
                                            )}
                                        </List>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Card elevation={0}>
                                    <CardContent>
                                        <Typography variant="h6" gutterBottom>
                                            자기소개
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {userInfo?.introduction}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>
                </Paper>
            </motion.div>
            <ComponentHelmet title={"Koreer - 마이페이지"} />
        </Container>
    );
}