import style from "../../assets/scss/sub/community.module.scss"
import {CommunityContents} from "./CommunityContents";
import {CommunityCategory} from "./CommunityCategory";
import {Outlet} from "react-router-dom";
import {CommunityType} from "../../types/community";
import {useState} from "react";

export function Community() {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const handleNextPage = () =>{
        if (currentPage < totalPage) {
            setCurrentPage((prev) => prev +1);
        }
    }
    return (
        <>
            <Outlet/>
            <div className={style.communityUpperWrapper}>
                {/* 커뮤니티 헤더 */}
                <div className={style.communityTitleWrapper}>
                    <span className={style.title}>커뮤니티</span>
                    <span
                        className={style.subTitle}>다른 사람들과 아이디어와 의견을 공유해보세요!</span>
                </div>

                <div className={style.contents}>
                    {/*  정렬, 카테고리  */}
                    <CommunityCategory type={CommunityType.COMMUNITY}/>

                    {/*  검색, 페이징  */}
                    <div className={style.searchAreaWrapper}>
                        <div className={style.refreshImg}/>
                        <div className={style.searchArea}>
                            <input
                                className={style.searchInput}
                                placeholder={"검색어를 입력하세요."}
                            />
                        </div>
                        <div className={style.pageArea} onClick={handleNextPage}>
                            {`${currentPage} / ${totalPage} page`}
                        </div>
                    </div>

                    <CommunityContents
                        currentPage={currentPage} setCurrentPage={setCurrentPage}
                        totalPage={totalPage} setTotalPage={setTotalPage}/>
                </div>
            </div>
        </>
    )
}