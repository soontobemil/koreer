import style from "../../assets/scss/sub/community.module.scss"
import {PageResponseDTO} from "@/slice/common";
import {useCommunityGetter} from "./hooks/useCommunityGetter";
import {useEffect} from "react";

interface Args {
    result?: PageResponseDTO
}

export function CommunityContents({result}: Args) {

    /**
     todo
     dto 필요한 값 추가 ex) category, nation등등
     배포 다시 체크
     유효성 검증 로직 추가
     */

    const {getCompanyInfo, posts} = useCommunityGetter();
    useEffect(() => {
        getCompanyInfo().then();
    }, []);


    return (
        <>
            <div className={style.communityContentWrapper}>
                {/*  커뮤니티 게시글  */}
                {posts?.data.map((data, index) => (
                    <div className={style.communityContent} key={index}>
                        <>
                            {/*  커뮤니티 헤더 영역  */}
                            <div className={style.contentHeaderWrapper}>
                                <div className={`${style.countryImg} ${style['kor']}`}></div>
                                <span>{data.user_email}</span>|
                                <span>{data.created_at}</span>
                                <div className={style.modifyImg}></div>
                            </div>

                            {/*  커뮤니티 내용 영역  */}
                            <div className={style.descriptionWrapper}>
                                <span className={style.description}>
                                    {data.content}
                                </span>
                            </div>

                            {/*  커뮤니티 푸터 영역  */}
                            <div className={style.contentFooterWrapper}>
                                <div className={style.contentCategoryWrapper}>
                                    <span className={style.categoryText}>
                                        {/*{data.category}*/}
                                    </span>
                                </div>
                                <span className={style.text}>
                                    {/*{data.hashTag}*/}
                                </span>
                                <span className={style.text}>
                                    #DOCKER
                                </span>
                            </div>
                        </>
                    </div>
                ))}


                {/*{communityContents.map((data, index) => (*/}
                {/*    <div className={style.communityContent} key={index}>*/}

                {/*        /!*  커뮤니티 헤더 영역  *!/*/}
                {/*        <div className={style.contentHeaderWrapper}>*/}
                {/*            <div className={`${style.countryImg} ${style[data.nation]}`}></div>*/}
                {/*            <span>{data.name}</span>|*/}
                {/*            <span>{data.time}</span>*/}
                {/*            <div className={style.modifyImg}></div>*/}
                {/*        </div>*/}

                {/*        /!*  커뮤니티 내용 영역  *!/*/}
                {/*        <div className={style.descriptionWrapper}>*/}
                {/*        <span className={style.description}>*/}
                {/*            {data.description}*/}
                {/*        </span>*/}
                {/*        </div>*/}

                {/*        /!*  커뮤니티 푸터 영역  *!/*/}
                {/*        <div className={style.contentFooterWrapper}>*/}
                {/*            <div className={style.contentCategoryWrapper}>*/}
                {/*            <span className={style.categoryText}>*/}
                {/*                {data.category}*/}
                {/*            </span>*/}
                {/*            </div>*/}
                {/*            <span className={style.text}>*/}
                {/*            {data.hashTag}*/}
                {/*        </span>*/}
                {/*            <span className={style.text}>*/}
                {/*            #DOCKER*/}
                {/*        </span>*/}
                {/*        </div>*/}

                {/*    </div>*/}
                {/*))}*/}
            </div>

        </>
    )
}