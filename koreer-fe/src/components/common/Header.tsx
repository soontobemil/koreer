import style from "../../assets/scss/common/header.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

enum HeaderStatus {
    ABOUT_US = "ABOUT_US",
    COMPANY_INFORMATION = "COMPANY_INFORMATION",
    COMMUNITY = "COMMUNITY",
    CONTACT = "CONTACT",
    NONE = "NONE",
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
            subMenu: ["Community", "Share your tips"]
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


    const [activeButton, setActiveButton] = useState(null);

    const onMouseEnter = (index: any) => {
        setActiveButton(index); // 마우스가 버튼 위에 있을 때 상태를 업데이트
    };

    const onMouseLeave = () => {
        setActiveButton(null); // 마우스가 버튼을 떠났을 때 상태를 초기화
    };

    return (
        <header className={style.header}>
            <div className={style.logoImg} onClick={() => onClickChangePage('', HeaderStatus.NONE)}>Koreer</div>
            <div className={style.headerButtonWrapper}>
                {selectedButtons.map((data, idx) => (
                    <div
                        key={idx}
                        onMouseEnter={() => onMouseEnter(idx)} // 마우스 진입 이벤트
                        onMouseLeave={onMouseLeave} // 마우스 이탈 이벤트
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
                                        <li>{menu}</li>
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