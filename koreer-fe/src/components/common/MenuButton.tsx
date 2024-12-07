import React from 'react';
import style from "../../assets/scss/common/header.module.scss";
import { HeaderStatus, SubMenu } from "./Header";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface ButtonData {
    label: string;
    page: string;
    status: HeaderStatus;
    subMenu: { title: SubMenu; subItems: string[] }[];
}

interface Args {
    selectedButtons: ButtonData[];
    headerStatus: HeaderStatus;
    activeButton: number | null;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    onClickChangePage: (page: string, status: HeaderStatus) => void;
}

export function MenuButton({
    selectedButtons,
    headerStatus,
    activeButton,
    onMouseEnter,
    onMouseLeave,
    onClickChangePage,
}: Args) {
    const navigate = useNavigate();

    const menuVariants = {
        hidden: {
            opacity: 0,
            y: -5,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut",
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            y: -5,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
        hover: { x: 5, transition: { duration: 0.2 } }
    };

    const handleNavigation = (path: string, hash?: string) => {
        navigate(path + (hash ? hash : ''));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const onClickChangSubPage = (menu: SubMenu) => {
        switch (menu) {
            case SubMenu.COMMUNITY:
                handleNavigation('/community');
                break;
            case SubMenu.SHARE_YOUR_TIPS:
                handleNavigation('/tips');
                break;
            case SubMenu.USA:
                handleNavigation('/visa-info/usa');
                break;
            case SubMenu.CANADA:
                handleNavigation('/visa-info/canada');
                break;
            case SubMenu.JOB_LISTINGS:
                handleNavigation('/employment-info');
                break;
            case SubMenu.INTERVIEW_PROCESS:
                handleNavigation('/interview-guide');
                break;
            case SubMenu.CAREER_TIPS:
                handleNavigation('/interview-guide', '#career-tips');
                break;
            case SubMenu.BIG_TECH:
                handleNavigation('/employment-info', '#big-tech');
                break;
            case SubMenu.POSITION_SALARY:
                handleNavigation('/salary-info/usa');
                break;
            default:
                break;
        }
    };

    const handleSubItemClick = (item: string) => {
        switch (item) {
            case "미국 비자":
                handleNavigation('/visa-info/usa');
                break;
            case "미국 연봉":
                handleNavigation('/salary-info/usa');
                break;
            case "현지 생활 정보":
                handleNavigation('/salary-info/usa', '#living-costs');
                break;
            case "캐나다 비자":
                handleNavigation('/visa-info/canada');
                break;
            case "캐나다 연봉":
                handleNavigation('/salary-info/canada');
                break;
            case "워크퍼밋 안내":
                handleNavigation('/visa-info/canada', '#work-permit');
                break;
            case "기술 면접":
                handleNavigation('/interview-guide', '#technical');
                break;
            case "인성 면접":
                handleNavigation('/interview-guide', '#behavioral');
                break;
            case "코딩 테스트":
                handleNavigation('/interview-guide', '#coding-test');
                break;
            case "이력서 작성":
            case "포트폴리오":
            case "면접 준비":
                handleNavigation('/interview-guide', '#career-tips');
                break;
            default:
                break;
        }
    };

    const SubItems = ({items, onClick}: { items: string[], onClick: (_: string) => void }) => (
        <motion.ul 
            className={style.subItems}
            initial="hidden"
            animate="visible"
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.05
                    }
                }
            }}
        >
            {items.map((item, index) => (
                <motion.li 
                    key={index}
                    variants={itemVariants}
                    whileHover="hover"
                    onClick={(e) => {
                        e.stopPropagation();
                        onClick(item);
                    }}
                >
                    {item}
                </motion.li>
            ))}
        </motion.ul>
    );

    const SubMenus = ({menu, onMenuClick, onSubItemClick}:
                          {
                              menu: { title: SubMenu, subItems: string[] }[],
                              onMenuClick: (_: SubMenu) => void,
                              onSubItemClick: (_: string) => void
                          }) => (
        <motion.div 
            className={style.subMenu}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
        >
            <ul>
                {menu.map((menuItem, index) => (
                    <motion.li 
                        key={index}
                        variants={itemVariants}
                    >
                        <motion.span 
                            onClick={(e) => {
                                e.stopPropagation();
                                onMenuClick(menuItem.title);
                            }}
                            className={style.subMenuTitle}
                            whileHover="hover"
                            variants={itemVariants}
                        >
                            {menuItem.title}
                        </motion.span>

                        {menuItem.subItems && menuItem.subItems.length > 0 && (
                            <SubItems 
                                items={menuItem.subItems} 
                                onClick={onSubItemClick}
                            />
                        )}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );

    return (
        <>
            {selectedButtons.map((data, idx) => (
                <motion.div
                    key={idx}
                    onMouseEnter={() => onMouseEnter(idx)}
                    onMouseLeave={onMouseLeave}
                    className={style.buttonContainer}
                >
                    <motion.button
                        onClick={() => onClickChangePage(data.page, data.status)}
                        className={`${style.buttonStyle} ${headerStatus === data.status ? style.selected : ''}`}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                    >
                        {data.label}
                    </motion.button>

                    <AnimatePresence>
                        {data.subMenu.length > 0 && activeButton === idx && (
                            <SubMenus
                                menu={data.subMenu}
                                onMenuClick={onClickChangSubPage}
                                onSubItemClick={handleSubItemClick}
                            />
                        )}
                    </AnimatePresence>
                </motion.div>
            ))}
        </>
    );
}
