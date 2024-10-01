import style from "../../assets/scss/common/header.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import hamburger from "../../assets/img/menu.svg"

enum HeaderStatus {
    ABOUT_US = "ABOUT_US",
    COMPANY_INFORMATION = "COMPANY_INFORMATION",
    COMMUNITY = "COMMUNITY",
    CONTACT = "CONTACT",
    NONE = "NONE",
}

enum SubMenu {
    COMMUNITY = "COMMUNITY",
    SHARE_YOUR_TIPS = "Share Your Tips",
}

export function Header() {
    const [headerStatus, setHeaderStatus] = useState(HeaderStatus.NONE);
    const navigate = useNavigate();

    const selectedButtons = [
        {label: 'About us', page: 'about-us', status: HeaderStatus.ABOUT_US, subMenu: []},
        {
            label: 'Community',
            page: 'community',
            status: HeaderStatus.COMMUNITY,
            subMenu: [SubMenu.COMMUNITY, SubMenu.SHARE_YOUR_TIPS]
        },
        {label: 'Job Information', page: 'company-information', status: HeaderStatus.COMPANY_INFORMATION, subMenu: []},
        {label: 'Contact', page: 'contact', status: HeaderStatus.CONTACT, subMenu: []},
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

    const onClickChangSubPage = (menu: SubMenu) => {
        switch (menu) {
            case SubMenu.COMMUNITY:
                return window.location.href = '/community';
            case SubMenu.SHARE_YOUR_TIPS:
                return window.location.href = '/tips';
        }
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
                <img style={{cursor:'pointer'}} src={hamburger} alt={'hamburger'} />
            </div>
            <div className={style.logoImg} onClick={() => onClickChangePage('', HeaderStatus.NONE)}>
                Koreer
            </div>
            <div className={`${style.headerButtonWrapper} ${isMenuOpen ? style.menuOpen : ''}`}>
                {selectedButtons.map((data, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => onMouseEnter(idx)} // Mouse enter event
                        onMouseLeave={onMouseLeave} // Mouse leave event
                        className={style.buttonContainer}
                    >
                        <button
                            onClick={() => onClickChangePage(data.page, data.status)}
                            className={`${style.buttonStyle} ${headerStatus === data.status ? style.selected : ''}`}
                        >
                            {data.label}
                        </button>

                        {data.subMenu.length > 0 && activeButton === idx && (
                            <div className={style.subMenu}>
                                <ul>
                                    {data.subMenu.map((menu, index) => (
                                        <li onClick={() => onClickChangSubPage(menu)} key={index}>
                                            {menu}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
                <button className={style.loginButton}
                        onClick={() => onClickChangePage('signin', HeaderStatus.NONE)}>Login
                </button>
            </div>
        </header>
    );
}