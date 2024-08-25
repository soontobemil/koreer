import style from "../../assets/scss/sub/signup.module.scss";

export function SignUpPasswordField() {
    return(
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Password
                </span>
                <input
                    placeholder={"Please write at least 8 characters"}
                    className={style.contentInput}
                />

            </div>
        </>
    )
}