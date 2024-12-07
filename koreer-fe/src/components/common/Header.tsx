import React, { useState, useEffect, useCallback } from 'react';
import style from '../../assets/scss/common/header.module.scss';
import { useNavigate } from 'react-router-dom';
import { MenuButton } from './MenuButton';
import { useCookieFunctions } from './hooks/useCookieFunctions';
import hamburger from '../../assets/img/menu.svg';
import { motion, AnimatePresence } from 'framer-motion';

export enum HeaderStatus {
    ABOUT_US = "ABOUT_US",
    COMPANY_INFORMATION = "COMPANY_INFORMATION",
    EMPLOYMENT_INFO = "EMPLOYMENT_INFO",
    COMMUNITY = "COMMUNITY",
    CONTACT = "CONTACT",
    NONE = "NONE",
}

export enum SubMenu {
    COMMUNITY = "커뮤니티",
    SHARE_YOUR_TIPS = "여러분의 팁을 공유해주세요!",
    CANADA = "캐나다",
    USA = "미국",
    BIG_TECH = "Big Tech 빅테크",
    POSITION_SALARY = "직군별 연봉",
    INTERVIEW_PROCESS = "인터뷰 과정",
    JOB_LISTINGS = "채용 공고",
    VISA_INFO = "비자 정보",
    CAREER_TIPS = "취업 준비 팁",
}

export function Header() {
    const [headerStatus, setHeaderStatus] = useState(HeaderStatus.NONE);
    const [isLogin, setIsLogin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {getCookie, removeCookie} = useCookieFunctions();
    const navigate = useNavigate();

    const selectedButtons = [
        {
            label: '취업 정보',
            page: 'employment-info',
            status: HeaderStatus.EMPLOYMENT_INFO,
            subMenu: [
                {
                    title: SubMenu.USA,
                    subItems: ["미국 비자", "미국 연봉", "현지 생활 정보"]
                },
                {
                    title: SubMenu.CANADA,
                    subItems: ["캐나다 비자", "캐나다 연봉", "워크퍼밋 안내"]
                },
                {
                    title: SubMenu.INTERVIEW_PROCESS,
                    subItems: ["기술 면접", "인성 면접", "코딩 테스트"]
                },
                {
                    title: SubMenu.CAREER_TIPS,
                    subItems: ["이력서 작성", "포트폴리오", "면접 준비"]
                }
            ]
        },
        {
            label: '회사 정보',
            page: 'company-information',
            status: HeaderStatus.COMPANY_INFORMATION,
            subMenu: []
        },
        {
            label: '커뮤니티',
            page: 'community',
            status: HeaderStatus.COMMUNITY,
            subMenu: [
                {title: SubMenu.COMMUNITY, subItems: []},
                {title: SubMenu.SHARE_YOUR_TIPS, subItems: []}
            ]
        }
    ];

    const onClickChangePage = useCallback((page: string, status: HeaderStatus) => {
        navigate(`/${page}`);
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        setHeaderStatus(status);
        setIsMenuOpen(false);
    }, [navigate]);

    const onClickLogout = useCallback(() => {
        const confirms = window.confirm('로그아웃 하시겠습니까?');
        if (confirms) {
            removeCookie('accessToken');
            removeCookie('refreshToken');
            window.location.reload();
        }
    }, [removeCookie]);

    const [activeButton, setActiveButton] = useState<number | null>(null);

    const onMouseEnter = useCallback((index: number) => {
        setActiveButton(index);
    }, []);

    const onMouseLeave = useCallback(() => {
        setActiveButton(null);
    }, []);

    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    useEffect(() => {
        const accessToken = getCookie('accessToken');
        setIsLogin(accessToken !== null);
    }, [getCookie]);

    useEffect(() => {
        const handleScroll = () => {
            if (isMenuOpen) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMenuOpen]);

    return (
        <motion.header 
            className={style.header}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div 
                className={style.hamburgerMenu} 
                onClick={toggleMenu}
                role="button"
                aria-label="Toggle menu"
            >
                <motion.img 
                    src={hamburger} 
                    alt="menu"
                    animate={{ rotate: isMenuOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                />
            </div>

            <motion.div 
                className={style.logoImg} 
                onClick={() => onClickChangePage('', HeaderStatus.NONE)}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                role="button"
                aria-label="Home"
            />

            <motion.div 
                className={style.headerTitle} 
                onClick={() => onClickChangePage('', HeaderStatus.NONE)}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                role="button"
                aria-label="Koreer"
            >
                Koreer
            </motion.div>

            <AnimatePresence>
                <motion.div 
                    className={`${style.headerButtonWrapper} ${isMenuOpen ? style.menuOpen : ''}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <MenuButton
                        selectedButtons={selectedButtons}
                        headerStatus={headerStatus}
                        activeButton={activeButton}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClickChangePage={onClickChangePage}
                    />
                    {isLogin ? (
                        <motion.button 
                            className={`${style.buttons} ${style.logout}`}
                            onClick={onClickLogout}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            Logout
                        </motion.button>
                    ) : (
                        <motion.button 
                            className={`${style.buttons} ${style.login}`}
                            onClick={() => onClickChangePage('signin', HeaderStatus.NONE)}
                            whileHover={{ y: -2 }}
                            whileTap={{ y: 0 }}
                        >
                            Login
                        </motion.button>
                    )}
                </motion.div>
            </AnimatePresence>
        </motion.header>
    );
}
