import style from "../../../assets/scss/common/main.module.scss";

export function CompanyInformationField() {
    return(
        <>
            <div className={style.questionContainer}>
                <div className={style.questionText}>북미 취업을 원해?</div>
                <div className={`${style.arrowImage} ${style.arrowImageRight}`}></div>
                <div className={`${style.arrowImage} ${style.arrowImageLeft}`}></div>
                <div className={style.buttonsContainer}>
                    <button className={style.questionButton}>Canada</button>
                    <button className={style.questionButton}>USA</button>
                </div>
            </div>
        </>
    )
}