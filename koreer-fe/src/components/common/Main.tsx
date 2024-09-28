import style from "../../assets/scss/common/main.module.scss"
import {ListItems} from "./main/ListItems";
import {HiringProcessField} from "./main/HiringProcessField";
import {CompanyInformationField} from "./main/CompanyInformationField";
import {TestimonialField} from "./main/TestimonialField";
import {TopButton} from "./TopButton";

export default function Main() {


    return (
        <>
            <div className={style.mainContainer}>

                {/* 북미 회사 조회 */}
                <CompanyInformationField/>

                <div className={style.underLine}/>

                {/*  커뮤니티 컴포넌트 분리예정  */}
                <div className={style.mainCommunityWrapper}>
                    <div className={style.communityTitleWrapper}>
                        <div className={style.titleTop}>TODAY HOT ARTICLE</div>
                        <div className={style.titleMain}>커뮤니티 인기 게시글 TOP 3</div>
                    </div>

                    <ListItems/>
                </div>

                <div className={style.underLine}/>

                {/*  북미 취업 과정 컴포넌트  */}
                <HiringProcessField/>

                {/*  평가 및 후기  */}
                {/*<TestimonialField />*/}
            </div>
            <TopButton/>
        </>
    )
}