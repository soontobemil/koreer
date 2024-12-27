import style from "../../assets/scss/sub/community.module.scss"
import {CommunityContents} from "./CommunityContents";
import {CommunityCategory} from "./CommunityCategory";
import {CommunityEmpty} from "./CommunityEmpty";
import {Outlet} from "react-router-dom";
import {CommunityCategories, CommunityType} from "../../types/community";
import {useEffect, useState} from "react";
import {useCommunityGetter} from "../../components/community/hooks/useCommunityGetter";

export function Community() {

    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [searchWord, setSearchWord] = useState("")
    const [category, setCategory] = useState<CommunityCategories>(CommunityCategories.ALL)
    const [isLoading, setIsLoading] = useState(false);

    const {getCompanyInfo, posts} = useCommunityGetter();

    const fetchCompanyInfo = async () => {
        setIsLoading(true);
        await getCompanyInfo({ page: currentPage, type: category, searchWord });
        setIsLoading(false);
    };

    useEffect(() => {
        fetchCompanyInfo().then();
    }, [currentPage, category]);

    useEffect(() => {
        if (posts) {
            setTotalPage(posts.meta.totalPages);
        }
    }, [posts]);

    const handlePageChange = (page: number) => {
        if (page <= totalPage) {
            setCurrentPage(page);
        }
    };

    const handleSearchWord = () => {
        setCurrentPage(1)
        fetchCompanyInfo().then();
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [category]);

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
                    <CommunityCategory type={CommunityType.COMMUNITY}
                                       categoryType={category}
                                       setCategoryType={setCategory}/>

                    {/*  검색, 페이징  */}
                    <div className={style.searchAreaWrapper}>
                        <div
                            className={style.refreshImg}
                            onClick={() => {
                                window.location.reload()
                            }}
                        />
                        <div className={style.searchWrapper}>
                            <div className={style.searchArea}>
                                <input
                                    className={style.searchInput}
                                    placeholder="검색어를 입력하세요."
                                    type="text"
                                    onChange={(e) => setSearchWord(e.target.value)}
                                />
                            </div>
                            <button className={style.searchButton} onClick={handleSearchWord}>
                                검색
                            </button>
                        </div>
                        <div className={style.paginationWrapper}>
                            {isLoading ? (
                                <div className={style.spinnerWrapper}>
                                    <div className={style.spinner}></div>
                                </div>
                            ) : (
                                <>
                                    <button
                                        className={`${style.pageButton} ${currentPage <= 1 ? style.disabled : ''}`}
                                        onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                                        disabled={currentPage <= 1}
                                        title="이전 페이지"
                                    >
                                        &lt;
                                    </button>
                                    <div className={style.pageArea}>
                                        {`${totalPage === 0 ? 0 : currentPage} / ${totalPage}`}
                                    </div>
                                    <button
                                        className={`${style.pageButton} ${currentPage >= totalPage ? style.disabled : ''}`}
                                        onClick={() => currentPage < totalPage && handlePageChange(currentPage + 1)}
                                        disabled={currentPage >= totalPage}
                                        title="다음 페이지"
                                    >
                                        &gt;
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {posts && totalPage >= 1 ? (
                        <CommunityContents posts={posts.data}/>
                    ) : (
                       <CommunityEmpty />
                    )}
                </div>
            </div>
        </>
    )
}