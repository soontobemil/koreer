import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Container,
    Avatar,
    Button,
    Tooltip,
    alpha,
    styled
} from '@mui/material';
import {
    KeyboardArrowDown,
    NotificationsOutlined,
    AccountCircleOutlined,
    BusinessOutlined,
    DescriptionOutlined,
    GroupsOutlined,
    LoginOutlined
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import koreerLogo from '../../assets/img/koreer_logo_cropped.png';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
}));

const NavButton = styled(Button)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontSize: '0.95rem',
    padding: '8px 16px',
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 500,
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: 'transparent',
        '&::before': {
            transform: 'translateX(0)',
            opacity: 0.1,
        }
    },
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `linear-gradient(120deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
        transform: 'translateX(-100%)',
        opacity: 0,
        transition: 'all 0.3s ease',
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    color: 'white',
    padding: '10px 24px',
    borderRadius: '12px',
    textTransform: 'none',
    fontSize: '0.95rem',
    fontWeight: 600,
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: '0 6px 25px rgba(0, 0, 0, 0.2)',
    }
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 12,
        marginTop: 8,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        minWidth: 220,
    },
    '& .MuiMenuItem-root': {
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        borderRadius: 8,
        margin: '4px 8px',
        transition: 'all 0.2s ease',
        '&:hover': {
            background: alpha(theme.palette.primary.main, 0.08),
            transform: 'translateX(4px)',
        },
    },
}));

const NotificationBadge = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: theme.palette.error.main,
    animation: 'pulse 2s infinite',
    '@keyframes pulse': {
        '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.7)',
        },
        '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 6px rgba(255, 0, 0, 0)',
        },
        '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)',
        },
    },
}));

export default function Navbar() {
    const [membershipAnchor, setMembershipAnchor] = useState<null | HTMLElement>(null);
    const [companyAnchor, setCompanyAnchor] = useState<null | HTMLElement>(null);
    const [communityAnchor, setCommunityAnchor] = useState<null | HTMLElement>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, menu: string) => {
        switch (menu) {
            case 'membership':
                setMembershipAnchor(event.currentTarget);
                break;
            case 'company':
                setCompanyAnchor(event.currentTarget);
                break;
            case 'community':
                setCommunityAnchor(event.currentTarget);
                break;
        }
    };

    const handleMenuClose = (menu: string) => {
        switch (menu) {
            case 'membership':
                setMembershipAnchor(null);
                break;
            case 'company':
                setCompanyAnchor(null);
                break;
            case 'community':
                setCommunityAnchor(null);
                break;
        }
    };

    const handleNavigation = (path: string) => {
        navigate(path);
        handleMenuClose('all');
    };

    return (
        <GlassAppBar 
            position="fixed" 
            elevation={isScrolled ? 0 : 0}
            sx={{
                transition: 'all 0.3s ease',
                transform: isScrolled ? 'translateY(-8px)' : 'translateY(0)',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ minHeight: 72 }}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Box
                            component="img"
                            src={koreerLogo}
                            alt="Koreer Logo"
                            sx={{
                                height: 40,
                                cursor: 'pointer',
                                mr: 4,
                                transition: 'transform 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                }
                            }}
                            onClick={() => navigate('/')}
                        />
                    </motion.div>

                    <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
                        <NavButton
                            onClick={(e) => handleMenuOpen(e, 'membership')}
                            endIcon={<KeyboardArrowDown />}
                        >
                            멤버십
                        </NavButton>
                        <StyledMenu
                            anchorEl={membershipAnchor}
                            open={Boolean(membershipAnchor)}
                            onClose={() => handleMenuClose('membership')}
                        >
                            <MenuItem onClick={() => handleNavigation('/membership/basic')}>
                                <AccountCircleOutlined />
                                <Box>
                                    <Typography variant="body1">기본 멤버십</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        무료로 시작하기
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('/membership/premium')}>
                                <BusinessOutlined />
                                <Box>
                                    <Typography variant="body1">프리미엄 멤버십</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        전문가 1:1 컨설팅
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </StyledMenu>

                        <NavButton
                            onClick={(e) => handleMenuOpen(e, 'company')}
                            endIcon={<KeyboardArrowDown />}
                        >
                            해외취업
                        </NavButton>
                        <StyledMenu
                            anchorEl={companyAnchor}
                            open={Boolean(companyAnchor)}
                            onClose={() => handleMenuClose('company')}
                        >
                            <MenuItem onClick={() => handleNavigation('/company-information')}>
                                <BusinessOutlined />
                                <Box>
                                    <Typography variant="body1">기업 정보</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        채용 중인 기업 정보
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('/visa-info/usa')}>
                                <DescriptionOutlined />
                                <Box>
                                    <Typography variant="body1">비자 가이드</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        비자 준비 및 인터뷰
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </StyledMenu>

                        <NavButton
                            onClick={(e) => handleMenuOpen(e, 'community')}
                            endIcon={<KeyboardArrowDown />}
                        >
                            커뮤니티
                        </NavButton>
                        <StyledMenu
                            anchorEl={communityAnchor}
                            open={Boolean(communityAnchor)}
                            onClose={() => handleMenuClose('community')}
                        >
                            <MenuItem onClick={() => handleNavigation('/community/general')}>
                                <GroupsOutlined />
                                <Box>
                                    <Typography variant="body1">일반 게시판</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        자유로운 소통
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem onClick={() => handleNavigation('/community/study')}>
                                <DescriptionOutlined />
                                <Box>
                                    <Typography variant="body1">스터디 모집</Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        함께 공부하기
                                    </Typography>
                                </Box>
                            </MenuItem>
                        </StyledMenu>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton
                            sx={{
                                position: 'relative',
                                color: 'text.primary',
                                '&:hover': {
                                    background: alpha('#000', 0.04),
                                }
                            }}
                        >
                            <NotificationsOutlined />
                            <NotificationBadge />
                        </IconButton>

                        <LoginButton
                            startIcon={<LoginOutlined />}
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </LoginButton>
                    </Box>
                </Toolbar>
            </Container>
        </GlassAppBar>
    );
} 