import {CommunityType} from "../../types/companyInformation";
import style from "../../assets/scss/sub/community.module.scss";

interface Args {
    type: CommunityType;
}

export function CommunityCategory({type}: Args) {

    const categories = [
        [
            {label: "전체", value: "",},
            {label: "사는이야기", value: "daily",},
            {label: "기술, 취업, 이직", value: "skill",},
            {label: "모임, 스터디", value: "study",}
        ], [
            {label: "전체", value: "",},
            {label: "해외 취업 정보", value: "info",},
            {label: "생활", value: "daily",},
            {label: "개발 기술, 최신 뉴스", value: "news",}
        ]
    ]
    const category = type === CommunityType.COMMUNITY
        ? categories[0] : categories[1]


    return (
        <>
            <div className={style.filterWrapper}>
                <div className={style.buttonsWrapper}>
                    <div className={style.sortButton}/>
                    <span className={style.text}>최신순</span>
                </div>

                {/*  카테고리 및 정렬 영역  */}
                <div className={style.categoryWrapper}>
                    <div className={style.categories}>
                        {category.map((data, idx) => (
                            <span key={idx} className={style.categoryContent}>
                              {data.label}
                            </span>
                        // @ts-ignore
                        )).reduce((prev, curr) => [prev, ' | ', curr])}

                    </div>
                </div>

                {/*  게시글 포스팅  */}
                <div className={style.buttonsWrapper}>
                    <div className={style.postingButton}/>
                    <span className={style.text}>글 작성하기</span>
                </div>
            </div>

        </>
    )
}