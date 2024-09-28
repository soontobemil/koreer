import style from "../../assets/scss/sub/community.module.scss"
import {CommunityContents} from "./CommunityContents";

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
                    <div className={style.filterWrapper}>
                        <div className={style.buttonsWrapper}>
                            <div className={style.sortButton}/>
                            <span className={style.text}>최신순</span>
                        </div>

                        {/*  카테고리 및 정렬 영역  */}
                        <div className={style.categoryWrapper}>
                            <div className={style.categories}>
                            <span className={style.categoryContent}>
                                전체
                            </span> |
                                <span className={style.categoryContent}>
                                사는 이야기
                            </span> |
                                <span className={style.categoryContent}>
                                기술, 취업, 이직
                            </span> |
                                <span className={style.categoryContent}>
                                모임, 스터디
                            </span>
                            </div>

                        </div>

                        {/*  게시글 포스팅  */}
                        <div className={style.buttonsWrapper}>
                            <div className={style.postingButton}/>
                            <span className={style.text}>글 작성하기</span>
                        </div>

                    </div>

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