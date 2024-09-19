import style from "../../assets/scss/sub/signup.module.scss"
import {SignUpIdField} from "./SignUpIdField";
import {SignUpPasswordField} from "./SignUpPasswordField";
import {SignUpPasswordConfirmField} from "./SignUpPasswordConfirmField";
import {SignUpNicknameField} from "./SignUpNicknameField";
import {SignUpNationField} from "./SignUpNationField";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {useSignUpValidator} from "./hooks/useSignUpValidator";
import {ValidateStatus} from "../../types/signup";

export function SignUp() {
    const [nation, setNation] = useState('Select your country!');
    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();
    const {
        validate,
        // nationValidate, setNationValidate,
        idValidate, setIdValidate,
        nickNameValidate, setNickNameValidate,
        passwordValidate, setPasswordValidate,
        passwordCheckValidate, setPasswordCheckValidate
    } =
        useSignUpValidator({nation, id, nickName, password, passwordCheck});

    const [isDuplecateChecked, setIsDuplecateChecked] = useState(false)

    const handleCancelButton = () => {
        // eslint-disable-next-line no-restricted-globals
        const confirms = confirm('Are you sure you want to cancel?\nAny unsaved changes will be lost')
        if (confirms) {
            navigate('/signin');
        }
    }

    console.log(isDuplecateChecked)
    const handleSignup = useCallback(async () => {
        isDuplecateChecked ? setIdValidate(ValidateStatus.NONE) : setIdValidate(ValidateStatus.UNFILLED);

        const isSignupAble = validate();

        if (isSignupAble) {
            console.log('signup end')
            const result: any = await dispatch(
                // createUser({
                //     user_email: id,
                //     username: nickName,
                //     nation: nation,
                //     password:password
                // }as UserPostDTO)
            ).unwrap();
            console.log(result)

        }
        // eslint-disable-next-line
    }, [id, nation, nickName, password, passwordCheck, isDuplecateChecked]);


    return (
        <>
            <div className={style.signupMainWrapper}>
                <div className={style.signupWrapper}>
                    <div className={style.header}>
                        Sign Up
                    </div>

                    <div className={style.body}>
                        <SignUpNationField nation={nation} setNation={setNation}/>

                        <SignUpIdField id={id} setId={setId}
                                       idValidate={idValidate} setIdValidate={setIdValidate}
                                       isDuplecateChecked={isDuplecateChecked}
                                       setIsDuplecateChecked={setIsDuplecateChecked}/>

                        <SignUpNicknameField nickName={nickName} setNickName={setNickName}
                                             nickNameValidate={nickNameValidate}
                                             setNickNameValidate={setNickNameValidate}/>

                        <SignUpPasswordField password={password} setPassword={setPassword}
                                             passwordValidate={passwordValidate}
                                             setPasswordValidate={setPasswordValidate}/>

                        <SignUpPasswordConfirmField passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck}
                                                    passwordCheckValidate={passwordCheckValidate}
                                                    setPasswordCheckValidate={setPasswordCheckValidate}/>
                        <div className={style.buttonsWrapper}>
                            <div className={style.cancelButton} onClick={handleCancelButton}>
                                Cancel
                            </div>
                            <div className={style.signupButton} onClick={handleSignup}>
                                Sign Up
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}