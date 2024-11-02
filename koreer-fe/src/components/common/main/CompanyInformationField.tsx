import style from "../../../assets/scss/common/main.module.scss";
// eslint-disable-next-line
import logo from "../../../assets/img/koreer_logo.png"
import cropped_logo from "../../../assets/img/koreer_logo_cropped.png"

export function CompanyInformationField() {
    return(
        <>
            <div className={style.container}>
                <div className={style.headingText}>북미 취업을<br />희망하세요?</div>
                <div className={style.subText}>
                    코리어와 함께 <br/>
                    커리어를 성장,<br/>
                    글로벌시장으로 나아가보세요.
                </div>
                <div className={style.imageBanner}>
                    <img src={cropped_logo} alt="Global Opportunities" className={style.bannerImage}/>
                </div>
                <div className={style.callToAction}>어느곳으로 해외취업을 희망하시나요?</div>
                <div className={style.buttonsContainer}>
                    <button className={style.choiceButton}>USA</button>
                    <button className={style.choiceButton}>CANADA</button>
                    <button className={style.choiceButton}>ASIA</button>
                </div>
            </div>
        </>
    )
}