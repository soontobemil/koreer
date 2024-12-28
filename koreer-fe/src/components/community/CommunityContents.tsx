import style from "../../assets/scss/sub/community.module.scss"
import {PageResponseDTO} from "@/slice/common";
import {useCommunityGetter} from "./hooks/useCommunityGetter";
import {useEffect, useRef, useState} from "react";

interface Args {
    result?: PageResponseDTO;
    currentPage: number;
    setCurrentPage: (_: number) => void;
    totalPage: number;
    setTotalPage: (_: number) => void;
}

export function CommunityContents(
    {result, currentPage, setCurrentPage, totalPage, setTotalPage}: Args) {

    /**
     todo
     dto 필요한 값 추가 ex) category, nation등등
     배포 다시 체크
     유효성 검증 로직 추가
     */

    const {getCompanyInfo, posts, deletePost} = useCommunityGetter();
    const [visibleModalIndex, setVisibleModalIndex] = useState(null);
    const modalRef = useRef<HTMLDivElement>(null);


    const handleModifyClick = (index: any) => {
        setVisibleModalIndex((prev) => (prev === index ? null : index)); // 모달 토글
    };

    const handleEdit = () => {
        alert("수정 페이지로 이동합니다.");
        setVisibleModalIndex(null);
    };

    const handleDelete = (idx: number) => {
        if (window.confirm("작성하신 게시글을 삭제하시겠습니까?")) {
            deletePost(idx).then(() =>{
                alert('삭제가 완료되었습니다.');
                window.location.reload();
            });
        }
        setVisibleModalIndex(null);
    };

    useEffect(() => {
        getCompanyInfo(currentPage).then();
    }, [currentPage]);

    // 모달 외부 클릭 감지 로직
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                setVisibleModalIndex(null); // 모달 닫기
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (posts) {
            setCurrentPage(posts.meta.currentPage);
            setTotalPage(posts.meta.totalPages)
        }
    }, [getCompanyInfo, posts]);

    return (
        <>
            <div ref={modalRef} className={style.communityContentWrapper}>
                {/*  커뮤니티 게시글  */}
                {posts?.data.map((data, index) => (
                    <div className={style.communityContent} key={index}>
                        <div style={{position: "relative"}}>
                            {/*  커뮤니티 헤더 영역  */}
                            <div className={style.contentHeaderWrapper}>
                                <div className={`${style.countryImg} ${style['kor']}`}></div>
                                <span>{data.user_email}</span>|
                                <span>{data.created_at}</span>
                                {data.is_owner && (
                                    <div className={style.modifyImg}
                                         onClick={() => handleModifyClick(index)}/>
                                )}
                            </div>
                            {(visibleModalIndex === index) && (
                                <div className={style.modalWrapper}>
                                    <button
                                        className={style.modalButton}
                                        onClick={handleEdit}
                                    >
                                        수정하기
                                    </button>
                                    <button
                                        className={`${style.modalButton} ${style.deleteButton}`}
                                        onClick={() => handleDelete(data.id)}
                                    >
                                        삭제하기
                                    </button>
                                </div>
                            )}

                            {/*  커뮤니티 내용 영역  */}
                            <div className={style.descriptionWrapper}>
                                <span className={style.description}>
                                    {data.title}
                                </span>
                            </div>

                            {/*  커뮤니티 푸터 영역  */}
                            <div className={style.contentFooterWrapper}>
                                <div className={style.contentCategoryWrapper}>
                                    <span className={style.categoryText}>
                                        {data.category}
                                    </span>
                                </div>
                                <span className={style.text}>
                                    {/*{data.hashTag}*/}
                                </span>
                                <span className={style.text}>
                                    #DOCKER
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}