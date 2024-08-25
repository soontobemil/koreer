import style from "../../assets/scss/sub/signup.module.scss";

export function SignUpPasswordConfirmField() {
    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Password Confirm
                </span>
                <input
                    placeholder={"Please write at least 8 characters"}
                    className={style.contentInput}
                />
            </div>
        </>
    )
}