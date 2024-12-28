import style from "../../assets/scss/sub/community.module.scss";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {CommunityType} from "../../types/community";

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
        navigate('/community/post')
    };

    return (
        <>
            <div className={style.filterWrapper}>
                <div className={style.leftSection}>
                    <button className={style.filterButton}>
                        <div className={style.sortButton}/>
                        <span className={style.text}>최신순</span>
                    </button>
                </div>

                <div className={style.categoryWrapper}>
                    <div className={style.categories}>
                        {category.map((data, idx) => (
                            <button
                                key={idx}
                                className={`${style.categoryContent} ${data.value === '' ? style.active : ''}`}
                            >
                                {data.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={style.rightSection}>
                    <button
                        className={style.filterButton}
                        onClick={onClickPosting}
                    >
                        <div className={style.postingButton}/>
                        <span className={style.text}>글 작성하기</span>
                    </button>
                </div>
            </div>

        </>
    )
}