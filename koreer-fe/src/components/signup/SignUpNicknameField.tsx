import style from "../../assets/scss/sub/signup.module.scss";

export function SignUpNicknameField() {
    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Nickname
                </span>
                <input
                    placeholder={"koreer123"}
                    className={style.contentInput}
                />
            </div>
        </>
    )
}