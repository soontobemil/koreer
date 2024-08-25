import style from "../../assets/scss/sub/signup.module.scss";

export function SignUpNationField() {
    return(
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Select your nation
                </span>
                <div className={style.contentWithNation}>
                    <div
                        className={style.nationWrapper}
                    />
                    <div className={style.selectButton}></div>
                </div>
            </div>
        </>
    )
}