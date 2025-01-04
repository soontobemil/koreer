import style from "../../assets/scss/sub/community.module.scss"
import {useCommunityGetter} from "./hooks/useCommunityGetter";
import {useEffect, useRef, useState} from "react";
import {CommunityFormProps} from "../../types/community";
import {useNavigate} from "react-router-dom";
import {PostsDTO} from "../../types/post";

interface Args {
    posts:PostsDTO[]
}

export function CommunityContents(
    {posts}: Args) {

    /**
     todo
     dto 필요한 값 추가 ex) category, nation등등
     배포 다시 체크
     유효성 검증 로직 추가
     */

    const { deletePost, getCommunityById, post} = useCommunityGetter();
    const [visibleModalIndex, setVisibleModalIndex] = useState(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate()

    const handleModifyClick = (index: any) => {
        setVisibleModalIndex((prev) => (prev === index ? null : index)); // 모달 토글
    };

    const handleEdit = (idx: number) => {
        setVisibleModalIndex(null);

        getCommunityById(idx).then((result) =>{
            const props:CommunityFormProps =
                {mode:'edit', postId: idx, initialData: result}
            navigate('post', { state: { ...props } });

        });
    };

    const handleDetail = (data:PostsDTO) => {
        navigate(`detail/${data.id}`,{ state: { ...(data) } })
    }

    const handleDelete = (idx: number) => {
        if (window.confirm("작성하신 게시글을 삭제하시겠습니까?")) {
            deletePost(idx).then(() =>{
                alert('삭제가 완료되었습니다.');
                window.location.reload();
            });
        }
        setVisibleModalIndex(null);
    };

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

    return (
        <>
            <div ref={modalRef} className={style.communityContentWrapper}>
                {/*  커뮤니티 게시글  */}
                {posts.map((data: PostsDTO, index: number) => (
                    <div className={style.communityContent} key={index} onClick={() => handleDetail(data)}>
                        <div style={{position: "relative"}}>
                            {/*  커뮤니티 헤더 영역  */}
                            <div className={style.contentHeaderWrapper}>
                                <div className={`${style.countryImg} ${style[`${data.nation}`]}`}></div>
                                <span>{data.username}</span>|
                                <span>{data.created_at}</span>
                                {data.is_owner && (
                                    <div className={style.modifyImg}
                                         onClick={() => handleModifyClick(index)}/>
                                )}
                            </div>
                            {(visibleModalIndex === index) && (
                                <div className={style.modalWrapper}>
                                    <div onClick={() => handleEdit(data.id)}>수정하기</div>
                                    <div onClick={() =>handleDelete(data.id)}>삭제하기</div>
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
                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </>
    )
}