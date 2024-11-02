import style from "../../assets/scss/common/header.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import hamburger from "../../assets/img/menu.svg"
import {MenuButton} from "./MenuButton";

export enum HeaderStatus {
    ABOUT_US = "ABOUT_US",
    COMPANY_INFORMATION = "COMPANY_INFORMATION",
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
}

export function Header() {
    const [headerStatus, setHeaderStatus] = useState(HeaderStatus.NONE);
    const navigate = useNavigate();

    const selectedButtons = [
        {
            label: '커뮤니티',
            page: 'community',
            status: HeaderStatus.COMMUNITY,
            subMenu: [
                {title:SubMenu.COMMUNITY, subItems:[]},
                {title: SubMenu.SHARE_YOUR_TIPS,subItems:[]}
            ]
        },
        {
            label: '취업 정보',
            page: 'company-information',
            status: HeaderStatus.COMPANY_INFORMATION,
            subMenu: [
                {title: SubMenu.USA, subItems: ["미국 비자", "미국 연봉"]},
                {title: SubMenu.CANADA, subItems: ["캐나다 비자", "캐나다 연봉"]},
                {title: SubMenu.INTERVIEW_PROCESS, subItems: ["1차", "2차", "3차"]},
                {title: SubMenu.POSITION_SALARY, subItems: ["BackEnd", "FrontEnd", "DevOps", "IOS", "GAME"]},
                {title: SubMenu.BIG_TECH, subItems: ["페이스북", "아마존", "넷플릭스", "구글", "마이크로소프트"]},
            ]},
        // {label: 'About us', page: 'about-us', status: HeaderStatus.ABOUT_US, subMenu: []},
        // {label: 'Contact', page: 'contact', status: HeaderStatus.CONTACT, subMenu: []},
    ];

    const onClickChangePage = (page: string, status: HeaderStatus) => {
        navigate(`/${page}`)
        window.scrollBy({
            left: 0,
            top: -window.scrollY,
            behavior: "smooth",
        });
        setHeaderStatus(status)
    }




    const [activeButton, setActiveButton] = useState(null);

    const onMouseEnter = (index: any) => {
        setActiveButton(index); // 마우스가 버튼 위에 있을 때 상태를 업데이트
    };

    const onMouseLeave = () => {
        setActiveButton(null); // 마우스가 버튼을 떠났을 때 상태를 초기화
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={style.header}>
            <div className={style.hamburgerMenu} onClick={toggleMenu}>
                {/* Hamburger Icon */}
                <img style={{cursor: 'pointer'}} src={hamburger} alt={'hamburger'}/>
            </div>

            <div className={style.logoImg} onClick={() => onClickChangePage('', HeaderStatus.NONE)}/>

            {/*  메인 로고 가운데정렬하기 위해 추가  */}
            <div className={style.headerTitle} onClick={() => onClickChangePage('', HeaderStatus.NONE)}>
                Koreer
            </div>

            <div className={`${style.headerButtonWrapper} ${isMenuOpen ? style.menuOpen : ''}`}>
                    <MenuButton
                        selectedButtons={selectedButtons}
                        headerStatus={headerStatus}
                        activeButton={activeButton}
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                        onClickChangePage={onClickChangePage}
                    />
                <button className={style.loginButton}
                        onClick={() => onClickChangePage('signin', HeaderStatus.NONE)}>Login
                </button>
            </div>
        </header>
    );
}