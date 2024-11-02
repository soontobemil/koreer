import style from "../../../assets/scss/common/main.module.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CommentIcon from "@mui/icons-material/Comment";

export function ListItems() {
    return (
        <>
            <div className={style.listBoxWrapper}>
                {/* API 연동 예정 아래는 더미데이터 */}
                <div className={style.listItems}>
                    <div className={style.listTitleWrapper}>
                        <span className={style.listCategory}>생활</span>
                        <span className={style.listTitle}>캐나다 랜트비 한달에 얼마정도 쓰시나요?</span>
                    </div>
                    <div className={style.listContentWrapper}>

                        <span className={style.listDescription}>
                            최근에 밴쿠버로 취업해서 집 부터 구하고 있는데 금액이 제가 생각한 금액의 3배네요 ㅋㅋ.. 자동차 + 집 + 보험 등등 이것저것 계산해보니 제가 방법을 잘못 사용하고 있나 싶은 생각이 들어서요.. 다들 어떻게...
                        </span>
                    </div>

                    <div className={style.listIconWrapper}>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <FavoriteIcon className="add"/>
                            <div style={{alignSelf:'center'}}>9</div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <VisibilityIcon className="read_icon"/>
                            <div style={{alignSelf:'center'}} >21</div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <CommentIcon className="comment_icon"/>
                            <div style={{alignSelf:'center'}}>3</div>
                        </div>
                    </div>
                </div>

                <div className={style.listItems}>
                    <div className={style.listTitleWrapper}>
                        <span className={style.listCategory}>정보</span>
                        <span className={style.listTitle}>아마존 인터뷰 방법</span>
                    </div>
                    <div className={style.listContentWrapper}>

                        <span className={style.listDescription}>
                            1. 알고리즘 및 자료구조 학습: 아마존 기술 면접에서는 알고리즘 문제 풀이가 중요한 부분입니다. 배열, 문자열, 트리, 그래프, 스택, 큐와 같은 자료구조와 이진 탐색, 동적 프로그래밍, 분할 정복 같은 알고리즘에 대한 깊은 이해가 필요합니다. LeetCode, HackerRank와 같은 플랫폼에서 문제를 풀어보며 실력을 쌓아야 합니다.
                            2. 행동 면접 준비 (Leadership Principles): 아마존에서는 리더십 원칙(Leadership Principles)에 맞는 행동을 평가합니다. STAR 방법론(상황-Task-행동-결과)을 사용하여 과거 경험을 이야기할 수 있도록 준비하세요.....

                        </span>
                    </div>

                    <div className={style.listIconWrapper}>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <FavoriteIcon className="add"/>
                            <div style={{alignSelf:'center'}}>22</div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <VisibilityIcon className="read_icon"/>
                            <div style={{alignSelf:'center'}}>7</div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <CommentIcon className="comment_icon"/>
                            <div style={{alignSelf:'center'}}>5</div>
                        </div>
                    </div>
                </div>

                <div className={style.listItems}>
                    <div className={style.listTitleWrapper}>
                        <span className={style.listCategory}>꿀팁</span>
                        <span className={style.listTitle}>릿코드 해야하나요?</span>
                    </div>
                    <div className={style.listContentWrapper}>

                        <span className={style.listDescription}>
                            현재 Silver 중간정도 되는데 해야한다면 어느정도 수준까지 해야할지 궁금합니다.. 그리고 단기간에 실력을 올릴 방법들이 어떤게 있을까요? 책들을 여러권 추천받았는데 어디서부터 시작해야할지 막막합니다...
                        </span>
                    </div>

                    <div className={style.listIconWrapper}>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <FavoriteIcon className="add"/>
                            <div style={{alignSelf:'center'}}>22</div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <VisibilityIcon className="read_icon"/>
                            <div style={{alignSelf:'center'}}>10</div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column", gap: '4px'}}>
                            <CommentIcon className="comment_icon"/>
                            <div style={{alignSelf:'center'}}>12</div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}