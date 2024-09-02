import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
interface Args{
    nickName: string;
    setNickName: (_: string) => void
}
export function SignUpNicknameField({nickName, setNickName}:Args) {
    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Nickname
                </span>
                <input
                    placeholder={"koreer123"}
                    className={style.contentInput}
                    onChange={(e) => handleSaveInput(e, setNickName)}
                />
            </div>
        </>
    )
}