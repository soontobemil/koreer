import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
interface Args{
    passwordCheck: string;
    setPasswordCheck: (_: string) => void
}
export function SignUpPasswordConfirmField({passwordCheck, setPasswordCheck}:Args) {
    return (
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Password Confirm
                </span>
                <input
                    type={"password"}
                    placeholder={"Please write at least 8 characters"}
                    className={style.contentInput}
                    onChange={(e) =>handleSaveInput(e, setPasswordCheck)}
                />
            </div>
        </>
    )
}