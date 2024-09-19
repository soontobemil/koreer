import style from "../../assets/scss/sub/signup.module.scss";
import {handleSaveInput} from "../../util/etcUtil";
import {ValidateStatus} from "../../types/signup";
import {useEffect} from "react";
interface Args{
    passwordCheck: string;
    setPasswordCheck: (_: string) => void
    passwordCheckValidate: ValidateStatus;
    setPasswordCheckValidate: (_: ValidateStatus) => void;
}
export function SignUpPasswordConfirmField({passwordCheck, setPasswordCheck,
                                           passwordCheckValidate, setPasswordCheckValidate}:Args) {

    useEffect(() => {
        setPasswordCheckValidate(ValidateStatus.NONE)
        // eslint-disable-next-line
    }, [passwordCheck]);
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
                {passwordCheckValidate === ValidateStatus.BELOW_REQUIRED_LENGTH && (
                    <span className={style.duplicateMessage}>
                        Please make sure your password is at least 4 characters long.
                    </span>
                )}
                {passwordCheckValidate === ValidateStatus.INVALID && (
                    <span className={style.duplicateMessage}>
                        Please make sure your password is at least 4 characters long.
                    </span>
                )}
            </div>
        </>
    )
}