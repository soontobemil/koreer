import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";

interface Args{
    password: string;
    setPassword: (_: string) => void
    passwordValidate: ValidateStatus;
    setPasswordValidate: (_: ValidateStatus) => void;
}
export function SignUpPasswordField({password,setPassword, passwordValidate, setPasswordValidate}:Args) {

    useEffect(() => {
        setPasswordValidate(ValidateStatus.NONE)
        // eslint-disable-next-line
    }, [password]);
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
                {passwordValidate === ValidateStatus.BELOW_REQUIRED_LENGTH && (
                    <span className={style.duplicateMessage}>
                        Please make sure your password is between 4 and 15 characters long.
                    </span>
                )}

            </div>
        </>
    )
}