import style from "../../assets/scss/sub/community.module.scss";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";
import {CommunityCategories, CommunityFormProps, CommunityType} from "../../types/community";

interface Args {
    type: CommunityType;
    categoryType: CommunityCategories;
    setCategoryType: (_:CommunityCategories) => void;
}

export function CommunityCategory({type, categoryType, setCategoryType}: Args) {

    const navigate = useNavigate();
    const [cookie]= useCookies(['accessToken', 'refreshToken']);

    const categories = [
        [
            {label: "전체", value: CommunityCategories.ALL,},
            {label: "사는이야기", value: CommunityCategories.DAILY,},
            {label: "기술, 취업, 이직", value: CommunityCategories.TECH,},
            {label: "모임, 스터디", value: CommunityCategories.STUDY,}
        ], [
            {label: "전체", value: CommunityCategories.ALL,},
            {label: "해외 취업 정보", value: CommunityCategories.INFO,},
            {label: "생활", value: CommunityCategories.OVERSEAS_INFORMATION,},
            {label: "개발 기술, 최신 뉴스", value: CommunityCategories.NEWS,}
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

    const handleChangeCategory = (data:CommunityCategories) => {
        setCategoryType(data);
    }

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
                            <span
                                key={idx}
                                className={`${style.categoryContent} ${categoryType === data.value ? style.active : ''}`}
                                onClick={() => handleChangeCategory(data.value)}
                            >
                    {data.label}
                </span>
                        ))}
                    </div>
                </div>

                <div className={style.buttonsWrapper} onClick={onClickPosting}>
                    <div className={style.postingButton}/>
                    <span className={style.text}>글 작성하기</span>
                </div>
            </div>
        </>
    )
}