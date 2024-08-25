import style from "../../assets/scss/sub/signup.module.scss";

export function SignUpIdField() {
    return(
        <>
            <div className={style.content}>
                            <span className={style.contentText}>
                                ID
                            </span>
                <div className={style.contentWithButton}>
                    <input
                        placeholder={"koreer@gmail.com"}
                        className={style.contentInput}
                    />
                    <button className={style.checkDuplicatedButton}>
                        Duplication Check
                    </button>

                </div>
            </div>
        </>
    )
}