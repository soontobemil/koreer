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
                {/* Community Header */}
                <div className={style.communityTitleWrapper}>
                    <span className={style.title}>커뮤니티</span>
                    <span className={style.subTitle}>
                        다른 사람들과 아이디어와 의견을 공유해보세요!
                    </span>
                </div>

                <div className={style.contents}>
                    {/* Sort and Categories */}
                    <CommunityCategory type={CommunityType.COMMUNITY}/>

                    {/* Search and Pagination */}
                    <div className={style.searchAreaWrapper}>
                        <button
                            className={style.refreshButton}
                            onClick={() => window.location.reload()}
                            aria-label="Refresh page"
                        >
                            <div className={style.refreshImg}/>
                        </button>
                        <div className={style.searchArea}>
                            <input
                                className={style.searchInput}
                                placeholder="검색어를 입력하세요..."
                                aria-label="게시글 검색"
                            />
                        </div>
                        <div className={style.paginationArea}>
                            <button
                                className={`${style.pageButton} ${currentPage === 1 ? style.disabled : ''}`}
                                onClick={() => currentPage > 1 && setCurrentPage(prev => prev - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                            >
                                ←
                            </button>
                            <span className={style.pageArea}>
                                페이지 {currentPage} / {totalPage}
                            </span>
                            <button
                                className={`${style.pageButton} ${currentPage === totalPage ? style.disabled : ''}`}
                                onClick={handleNextPage}
                                disabled={currentPage === totalPage}
                                aria-label="Next page"
                            >
                                →
                            </button>
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