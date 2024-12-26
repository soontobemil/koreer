import style from "../../assets/scss/sub/community.module.scss";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {CommunityFormProps, CommunityType} from "../../types/community";

interface Args {
    type: CommunityType;
}

export function CommunityCategory({type}: Args) {

    const navigate = useNavigate();
    const [cookie]= useCookies(['accessToken', 'refreshToken']);

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

    // @ts-ignore
    const onClickPosting = () => {
        if (!cookie.accessToken) {
            alert('로그인 후 시도해주세요');
            return false;
        }
        const props:CommunityFormProps =
            {mode:'create'}
        navigate('/community/post', { state: { ...props } });
    };

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
                <div className={style.buttonsWrapper} onClick={() =>onClickPosting()}>
                    <div className={style.postingButton}/>
                    <span className={style.text}>글 작성하기</span>
                </div>
            </div>

        </>
    )
}