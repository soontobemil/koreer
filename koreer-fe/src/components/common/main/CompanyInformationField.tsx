import style from "../../../assets/scss/common/main.module.scss";
import blackBackgroundLogo from "../../../assets/img/logo_with_black_background.png"

export function CompanyInformationField() {
    return(
        <>
            <div className={style.container}>
                <div className={style.headingText}>Dreaming of an Exciting Career Abroad?</div>
                <div className={style.subText}>Discover opportunities in the global market and elevate your career to
                    new heights.
                </div>
                <div className={style.imageBanner}>
                    <img src={blackBackgroundLogo} alt="Global Opportunities" className={style.bannerImage}/>
                </div>
                <div className={style.callToAction}>Where would you like to explore your future career?</div>
                <div className={style.buttonsContainer}>
                    <button className={style.choiceButton}>USA</button>
                    <button className={style.choiceButton}>CANADA</button>
                    <button className={style.choiceButton}>Venture to North America</button>
                </div>
            </div>
        </>
    )
}