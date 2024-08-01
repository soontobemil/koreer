import {Header} from "./Header";
import style from "../../assets/scss/common/main.module.scss"
import {useState} from "react";
import {ListItems} from "../ListItems";

export default function Main(){

    const [menuOpen, setMenuOpen] = useState(false);

    const handleHamburgerClick = () => {
        setMenuOpen(!menuOpen);
    };

    return(
        <>
        <Header/>
        <div className={style.mainContainer}>

            {/* 메인 타이틀 부분 */}
            <div className={style.mainHeaderWrapper}>
                <button className={style.mainTitleWrapper}>
                    <span className={style.mainTitleText}>Koreer</span>
                </button>
                <div className={style.hamburgerMenu} onClick={handleHamburgerClick}>
                    <div className={style.bar}></div>
                    <div className={style.bar}></div>
                    <div className={style.bar}></div>
                </div>
            </div>

            {/* 북미 회사 조회 컴포넌트 분리 예정 */}
            <div className={style.questionContainer}>
                <div className={style.questionText}>북미 취업을 원해?</div>
                <div className={`${style.arrowImage} ${style.arrowImageRight}`}></div>
                <div className={`${style.arrowImage} ${style.arrowImageLeft}`}></div>
                <div className={style.buttonsContainer}>
                    <button className={style.questionButton}>Canada</button>
                    <button className={style.questionButton}>USA</button>
                </div>
            </div>

        {/*  커뮤니티 컴포넌트 분리예정  */}
            <div className={style.mainCommunityWrapper}>
                <div className={style.communityTitleWrapper}>
                    <div className={style.titleTop}>TODAY HOT ARTICLE</div>
                    <div className={style.titleMain}>커뮤니티 인기 게시글 TOP 5</div>
                </div>

                <ListItems />
            </div>


        </div>
        </>
    )
}