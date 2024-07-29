import {Header} from "./Header";
import style from "../../assets/scss/common/main.module.scss"

export default function Main(){
    return(
        <>
        <Header/>
        <div className={style.mainContainer}>
            <div className={style.questionContainer}>
                <div className={style.questionText}>북미 취업을 원해?</div>
                <div className={`${style.arrowImage} ${style.arrowImageRight}`}></div>
                <div className={`${style.arrowImage} ${style.arrowImageLeft}`}></div>
                <div className={style.buttonsContainer}>
                    <button className={style.questionButton}>Canada</button>
                    <button className={style.questionButton}>USA</button>
                </div>
            </div>
        </div>
</>
)
}