import style from "../../assets/scss/sub/community.module.scss"
import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useState} from "react";
import {CommunityCategories} from "../../types/community";
import {useCommunityValidator} from "./hooks/useCommunityValidator";
import {useDispatch} from "react-redux";
import {createPostAsync, updatePostAsync} from "../../slice/postSlice";

export function CommunityForm() {
    const location = useLocation();
    const { mode, initialData, postId } = location.state || {};
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [category, setCategory] = useState<CommunityCategories | "">(initialData?.category || "");

    const modeText = {
        create: {
            title: '커뮤니티 작성하기',
            button: '등록하기',
            confirmMessage: '게시글을 등록하시겠습니까?',
            successMessage: '등록이 완료됐습니다.'
        },
        edit: {
            title: '게시글 수정하기',
            button: '수정하기',
            confirmMessage: '게시글을 수정하시겠습니까?',
            successMessage: '수정이 완료됐습니다.'
        }
    };

    const onClickCancelHandler = () => {
        if (!window.confirm('취소하시면 작성중인 내용이 모두 사라집니다.\n정말 취소하시겠습니까?')) return ;
        navigate('/community')
    }

    const {validate} = useCommunityValidator({title, content, category})

    const handlePosting = useCallback(async () => {
        const isValidate = validate();
        if (!isValidate || category === "") return;

        // @ts-ignore
        if (window.confirm(modeText[mode].confirmMessage)) {
            const dto = {
                title,
                content,
                category
            };

            try {
                if (mode === 'create') {
                    await dispatch(createPostAsync(dto));
                } else {
                    postId &&
                    await dispatch(updatePostAsync({ dto, idx : postId }));
                }
                // @ts-ignore
                alert(modeText[mode].successMessage);
                navigate('/community');
            } catch (e) {
                console.log('error message : ', e)
            }
        }
    }, [title, content, category, mode, postId]);

    return (
        <>
            <div className={style.communityUpperWrapper}>
                <div className={style.communityTitleWrapper}>
                    <span className={style.subTitle}>커뮤니티 작성하기</span>
                </div>
                <form className={style.formWrapper}>
                    <label className={style.label}>
                        카테고리
                        <select
                            className={style.select}
                            value={category}
                            onChange={(e) => setCategory(e.target.value as CommunityCategories)}
                        >
                            <option value="">카테고리를 선택해주세요.</option>
                            <option value="DAILY">사는 이야기</option>
                            <option value="TECH">기술, 취업, 이직</option>
                            <option value="STUDY">모임, 스터디</option>
                        </select>
                    </label>

                    <label className={style.label}>
                        제목
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요."
                            className={style.input}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label className={style.label}>
                        본문
                        <textarea
                            placeholder="내용을 입력해주세요."
                            className={style.textarea}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </label>
                </form>

                <div className={style.registrationButtonWrapper}>
                    <button className={`${style.buttons} ${style.cancel}`} onClick={onClickCancelHandler}>취소하기</button>
                    <button className={`${style.buttons} ${style.registration}`} onClick={handlePosting}>등록하기</button>
                </div>
            </div>
        </>
    )
}