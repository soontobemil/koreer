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
import {UserPostDTO} from "../../types/signup";
import {register} from "../../slice/signupSlice";
import {ConfirmModal} from "../modal/ConfirmModal";

export function SignUp() {
    const [nation, setNation] = useState('Select your country!');
    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('')
    const navigate = useNavigate()
    const [signUpSuccess, setSignUpSuccess] = useState(false);
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

    const handleSignup = useCallback(async () => {

        const isSignupAble = validate();

        if (isSignupAble) {
            try {
                 const result = await dispatch(
                    register({
                        user_email: id,
                        username: nickName,
                        nation: nation,
                        password: password
                    } as UserPostDTO)
                ).unwrap().then(() =>{
                    console.log('result : ',result)
                    setSignUpSuccess((re) => !re)
                });
                    console.log('result : ',result)

            } catch (e){
                console.log('error message : ',e)
            }

        }
        // eslint-disable-next-line
    }, [id, nation, nickName, password, passwordCheck, isDuplecateChecked, idValidate, setIdValidate]);


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
                {signUpSuccess && (
                    <ConfirmModal modalClose={setSignUpSuccess}/>
                )}

            </div>
        </>
    );
}