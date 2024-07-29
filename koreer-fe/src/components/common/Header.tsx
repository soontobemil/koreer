import style from "../../assets/scss/common/header.module.scss";

export function Header() {

    return (
        <>
            <header className={style.header}>
                <div className={style.headerButtonWrapper}>
                    <button>About us</button>
                    <button>Community</button>
                    <button>Job Information</button>
                    <button>Contact</button>
                    <button>Login</button>
                </div>
            </header>
        </>
    );
}