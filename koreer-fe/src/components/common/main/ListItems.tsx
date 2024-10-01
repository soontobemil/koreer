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
                        <span className={style.listTitle}>How can i  beat Kangaroos?</span>
                    </div>
                    <div className={style.listContentWrapper}>

                        <span className={style.listDescription}>There are a lot of kangaroos in my neighborhood.
                            Sometimes they get into fights and it's scary because they move around in groups.
                            What should...</span>
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
                        <span className={style.listCategory}>꿀팁</span>
                        <span className={style.listTitle}>캐나다 항공 공짜로 구하는 법</span>
                    </div>
                    <div className={style.listContentWrapper}>

                        <span className={style.listDescription}>1. 스카이스캐너에 접속한다. 2. 환경설정에서 하단의...</span>
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
                        <span className={style.listTitle}>Three ways to prepare for IT technical interviews</span>
                    </div>
                    <div className={style.listContentWrapper}>

                        <span className={style.listDescription}>
                            1. Take a deep breath in. 2. Exhale deeply. 3. Repeat the above steps 10 times. 4. ...
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