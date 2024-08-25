import style from "../../assets/scss/common/header.module.scss";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

enum HeaderStatus{
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
        { label: 'About us', page: 'about-us', status:HeaderStatus.ABOUT_US },
        { label: 'Community', page: 'community', status:HeaderStatus.COMMUNITY },
        { label: 'Job Information', page: 'company-information', status:HeaderStatus.COMPANY_INFORMATION },
        { label: 'Contact', page: 'contact', status:HeaderStatus.CONTACT },
    ];

    const onClickChangePage = (page: string, status: HeaderStatus) =>{
        navigate(`/${page}`)
        setHeaderStatus(status)
    }

    return (
        <>
            <header className={style.header}>
                <div className={style.logoImg} onClick={() =>onClickChangePage('',HeaderStatus.NONE)}>로고 자리</div>
                <div className={style.headerButtonWrapper}>
                    {selectedButtons.map((data, idx) => (
                        <button key={idx}
                                onClick={() => onClickChangePage(data.page, data.status)}
                                className={headerStatus === data.status ? style.selected : ''}
                        >
                            {data.label}
                        </button>
                    ))}
                    <button onClick={() => onClickChangePage('signin', HeaderStatus.NONE)}>Login</button>
                </div>
            </header>
        </>
    );
}