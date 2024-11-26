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
    const [nation, setNation] = useState('국가를 선택해주세요!');
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
        const confirms = confirm('가입을 취소하시겠습니까?\n작성중인 정보는 삭제됩니다.')
        if (confirms) {
            navigate('/signin');
        }
    }

    const handleSignup = useCallback(async () => {

        const isSignupAble = validate();
        if (!isSignupAble) return false

        try {
            await dispatch(
                register({
                    user_email: id,
                    username: nickName,
                    nation: nation,
                    password: password
                } as UserPostDTO)
            ).then(() => {
                setSignUpSuccess((re) => !re)
            });

        } catch (e) {
            console.log('error message : ', e)
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
                                취소
                            </div>
                            <div className={style.signupButton} onClick={handleSignup}>
                                회원 가입
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