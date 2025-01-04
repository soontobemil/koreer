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
    Divider,
    List,
    ListItem,
    ListItemText,
    Chip,
    LinearProgress,
} from '@mui/material';
import {
    Person,
    Email,
    LocationOn,
    Work,
    School,
    Timeline,
    Bookmark,
    Settings
} from '@mui/icons-material';
import { useState } from 'react';

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

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // 프로필 데이터 (임시)
    const profile = {
        name: "홍길동",
        email: "hong@example.com",
        location: "토론토, 캐나다",
        occupation: "Software Engineer",
        education: "한국대학교",
        joinDate: "2023년 12월",
        interests: ["Frontend", "React", "TypeScript", "UI/UX"],
        skills: [
            { name: "React", level: 80 },
            { name: "TypeScript", level: 75 },
            { name: "Node.js", level: 70 },
        ],
        activities: [
            { type: "게시글", content: "캐나다 취업 후기", date: "2024-01-01" },
            { type: "댓글", content: "좋은 정보 감사합니다!", date: "2024-01-02" },
        ],
        bookmarks: [
            { title: "미국 취업 비자 가이드", category: "비자정보" },
            { title: "실리콘밸리 연봉 정보", category: "연봉정보" },
        ]
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
                                    {profile.name[0]}
                                </Avatar>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sm>
                            <Typography variant="h4" gutterBottom>
                                {profile.name}
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm="auto">
                                    <Box display="flex" alignItems="center">
                                        <Email sx={{ mr: 1 }} />
                                        {profile.email}
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm="auto">
                                    <Box display="flex" alignItems="center">
                                        <LocationOn sx={{ mr: 1 }} />
                                        {profile.location}
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
                        <Tab icon={<Person />} label="프로필" />
                        <Tab icon={<Timeline />} label="활동내역" />
                        <Tab icon={<Bookmark />} label="북마크" />
                        <Tab icon={<Settings />} label="설정" />
                    </Tabs>

                    {/* 프로필 탭 */}
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
                                                    primary="직업"
                                                    secondary={profile.occupation}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="학력"
                                                    secondary={profile.education}
                                                />
                                            </ListItem>
                                            <ListItem>
                                                <ListItemText
                                                    primary="가입일"
                                                    secondary={profile.joinDate}
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
                                            관심 분야
                                        </Typography>
                                        <Box sx={{ mb: 3 }}>
                                            {profile.interests.map((interest) => (
                                                <Chip
                                                    key={interest}
                                                    label={interest}
                                                    sx={{ m: 0.5 }}
                                                    color="primary"
                                                    variant="outlined"
                                                />
                                            ))}
                                        </Box>
                                        <Typography variant="h6" gutterBottom>
                                            스킬
                                        </Typography>
                                        {profile.skills.map((skill) => (
                                            <Box key={skill.name} sx={{ mb: 2 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        mb: 1
                                                    }}
                                                >
                                                    <Typography>{skill.name}</Typography>
                                                    <Typography>{skill.level}%</Typography>
                                                </Box>
                                                <LinearProgress
                                                    variant="determinate"
                                                    value={skill.level}
                                                    sx={{ height: 8, borderRadius: 4 }}
                                                />
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </TabPanel>

                    {/* 활동내역 탭 */}
                    <TabPanel value={tabValue} index={1}>
                        <List>
                            {profile.activities.map((activity, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ListItem>
                                        <ListItemText
                                            primary={activity.content}
                                            secondary={`${activity.type} • ${activity.date}`}
                                        />
                                    </ListItem>
                                    <Divider />
                                </motion.div>
                            ))}
                        </List>
                    </TabPanel>

                    {/* 북마크 탭 */}
                    <TabPanel value={tabValue} index={2}>
                        <Grid container spacing={2}>
                            {profile.bookmarks.map((bookmark, index) => (
                                <Grid item xs={12} sm={6} key={index}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Card elevation={0} sx={{ height: '100%' }}>
                                            <CardContent>
                                                <Typography variant="h6" gutterBottom>
                                                    {bookmark.title}
                                                </Typography>
                                                <Chip
                                                    label={bookmark.category}
                                                    size="small"
                                                    color="primary"
                                                />
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </Grid>
                    </TabPanel>

                    {/* 설정 탭 */}
                    <TabPanel value={tabValue} index={3}>
                        <Typography variant="body1" color="text.secondary">
                            설정 내용이 들어갈 자리입니다.
                        </Typography>
                    </TabPanel>
                </Paper>
            </motion.div>
        </Container>
    );
}