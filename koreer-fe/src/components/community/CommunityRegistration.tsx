import style from "../../assets/scss/sub/community.module.scss"
import {useNavigate} from "react-router-dom";

export function CommunityRegistration() {

    const navigate = useNavigate();

    const onClickCancelHandler = () =>{
        if(!window.confirm('취소하시면 작성중인 내용이 모두 사라집니다.\n정말 취소하시겠습니까?')) return false;
        navigate('/community')
    }

    return (
        <>
            <div className={style.communityUpperWrapper}>
                <div className={style.communityTitleWrapper}>
                    <span className={style.subTitle}>커뮤니티 작성하기</span>
                </div>
                <form className={style.formWrapper}>
                    <label className={style.label}>
                        카테고리
                        <select className={style.select}>
                            <option value="">카테고리를 선택해주세요.</option>
                            <option value="datily">사는 이야기</option>
                            <option value="tech">기술, 취업, 이직</option>
                            <option value="study">모임, 스터디</option>
                        </select>
                    </label>

                    <label className={style.label}>
                        제목
                        <input
                            type="text"
                            placeholder="제목을 입력해주세요."
                            className={style.input}
                        />
                    </label>

                    <label className={style.label}>
                        태그
                        <input
                            type="text"
                            placeholder="태그를 입력해주세요."
                            className={style.input}
                        />
                    </label>

                    <label className={style.label}>
                        본문
                        <textarea
                            placeholder="내용을 입력해주세요."
                            className={style.textarea}
                        />
                    </label>
                </form>

                <div className={style.registrationButtonWrapper}>
                    <button className={`${style.buttons} ${style.cancel}`} onClick={onClickCancelHandler}>취소하기</button>
                    <button className={`${style.buttons} ${style.registration}`}>등록하기</button>
                </div>
            </div>
        </>
    )
}