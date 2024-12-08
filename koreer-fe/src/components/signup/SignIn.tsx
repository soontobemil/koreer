import style from "../../assets/scss/sub/login.module.scss"
import {useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {LoginResponseDTO} from "../../slice/common";
import {useDispatch} from "react-redux";
import {login} from "../../slice/signInSlice";
import {LoginDTO} from "../../types/signIn";
import {SignInIdField} from "./SignInIdField";
import {SignInPasswordField} from "./SignInPasswordField";
import {SignInSearchField} from "./SignInSearchField";
import {AuthProvider} from "../common/AuthProvider";
import {useSignInValidator} from "./hooks/useSignInValidator";
import spinner from "../../assets/img/community/loading_spinner.gif";

interface ErrorResponse{
    message: string;
}

export function SignIn() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const {validate, emailValidate, setEmailValidate, passwordValidate, setPasswordValidate} =
        useSignInValidator({email,password} );
    const {setAccessToken} = AuthProvider();
    const [isLoaded, setIsLoaded] = useState(false)

    const dispatch = useDispatch<any>();


    const handleSignup = () => {
        navigate('/signup')
    }

    const redirectUri = `${process.env.REACT_APP_BASE_URL}/auth/google/callback`;
    // const redirectUri = 'http://localhost:3001/test';
    const googleClientId = '969073700844-r0dbph7gk0e9aqm5868ums9jgddqgvg2.apps.googleusercontent.com'
    const googleLoginssss = useCallback(async () => {
        window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    }, []);

    useEffect(() => {
        setErrorMessage('')
    }, [email, password]);

    const signIn = useCallback(async () => {
        setIsLoaded(true);
        const result = validate();
        if(!result) return ;

        const loginDTO:LoginDTO = {user_email: email, password: password}
        try {
            const result: LoginResponseDTO = await dispatch(login(loginDTO)).unwrap();
            setAccessToken(result.accessToken)
            navigate('/')

            return result;
        } catch (error: any) {
            const convert = error as ErrorResponse;
            const parsedMessage = JSON.parse(convert.message);

            setErrorMessage(parsedMessage.message);
        } finally {
            setIsLoaded(false)
        }
        // eslint-disable-next-line
    }, [email, password]);

    return (
        <>
            {isLoaded && (
                <img className={style.spinner} src={spinner} alt={'spinner'}/>
            )}
            <div className={style.loginMainWrapper}>
                <div className={style.loginContainer}>
                    <div className={style.titleWrapper}>
                        <span className={style.mainText}>Koreer</span>
                        <span className={style.subText}>서비스 이용을 위해 로그인을 해주세요.</span>
                        <span className={style.infoText}>회원이 아닌 경우, 회원 가입을 통해 서비스를 이용하실 수 있습니다.</span>
                    </div>

                    {/*  로그인 영역  */}
                    <div className={style.loginInputWrapper}>
                        <SignInIdField
                            email={email} setEmail={ setEmail}
                            emailValidate={emailValidate} setEmailValidate={setEmailValidate}
                        />

                        <SignInPasswordField
                            password={password} setPassword={setPassword}
                            passwordValidate={passwordValidate} setPasswordValidate={setPasswordValidate}
                        />
                        <span className={style.loginErrorText}>{errorMessage}</span>
                        <SignInSearchField />
                    </div>

                    <div className={style.buttonsWrapper}>
                        <button className={style.loginButton}
                                onClick={signIn}>
                            로그인
                        </button>
                        <div className={style.imgWrapper}>
                            <div className={style.googleImg} onClick={googleLoginssss}></div>
                            <div className={style.kakaoImg}></div>

                        </div>
                    </div>

                    <div className={style.signupWrapper} onClick={handleSignup}>
                        <span className={style.text}>
                            처음이신가요? 회원가입 후 이용해주세요!
                        </span>
                        <div className={style.buttonsWrapper}>
                            <button className={style.signupButton}>
                                회원 가입
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}