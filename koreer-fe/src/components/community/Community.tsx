import style from "../../assets/scss/sub/community.module.scss"
import {CommunityContents} from "./CommunityContents";
import {CommunityCategory} from "./CommunityCategory";
import {CommunityType} from "../../types/companyInformation";

export function Community() {
    return (
        <>
            <div className={style.communityUpperWrapper}>
                {/* 커뮤니티 헤더 */}
                <div className={style.communityTitleWrapper}>
                    <span className={style.title}>Community</span>
                    <span
                        className={style.subTitle}>Share your thoughts and opinions with a diverse group of people.</span>
                </div>

                <div className={style.contents}>
                    {/*  정렬, 카테고리  */}
                    <CommunityCategory type={CommunityType.COMMUNITY} />

                    {/*  검색, 페이징  */}
                    <div className={style.searchAreaWrapper}>
                        <div className={style.refreshImg}/>
                        <div className={style.searchArea}>
                            <input
                                className={style.searchInput}
                                placeholder={"검색어를 입력하세요."}
                            />
                        </div>
                        <div className={style.pageArea}>
                            1 / 3 page
                        </div>
                    </div>

                    <CommunityContents />
                </div>
            </div>
        </>
    )
}