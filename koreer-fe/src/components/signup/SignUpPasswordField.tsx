import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
interface Args{
    password: string;
    setPassword: (_: string) => void
}
export function SignUpPasswordField({password,setPassword}:Args) {
    return(
        <>
            <div className={style.content}>
                <span className={style.contentText}>
                    Password
                </span>
                <input
                    type={"password"}
                    placeholder={"Please write at least 8 characters"}
                    className={style.contentInput}
                    onChange={(e) =>handleSaveInput(e, setPassword)}
                />

            </div>
        </>
    )
}