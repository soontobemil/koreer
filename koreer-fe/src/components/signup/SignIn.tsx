import style from "../../assets/scss/sub/login.module.scss"
import {useNavigate} from "react-router-dom";

export function SignIn() {
    const navigate= useNavigate()

    const handleSignup = () =>{
        navigate('/signup')
    }
    return (
        <>
            <div className={style.loginMainWrapper}>
                <div className={style.loginContainer}>
                    <div className={style.titleWrapper}>
                        <span className={style.mainText}>Koreer</span>
                        <span className={style.subText}>Please log in to access the service.</span>
                        <span className={style.infoText}>If you're not a member, please sign up to enjoy a variety of services</span>
                    </div>

                    <div className={style.loginInputWrapper}>
                        <div className={style.loginForm}>
                            <input type="email" placeholder="koreer@gmail.com" className={style.loginInput}/>
                            <span className={style.loginAssistText}>
                                ID
                            </span>
                        </div>
                        <div className={style.loginForm}>
                            <input type="password" placeholder="1234" className={style.loginInput}/>
                            <span className={style.loginAssistText}>
                                Password
                            </span>
                        </div>

                        <div className={style.loginOptions}>
                            <label className={style.memorizeWrapper}>
                                <input type="checkbox"/> Remember ID and Password
                            </label>
                            <div className={style.findInfoWrapper}>
                                Find<span className={style.findText}>ID</span>|
                                <span className={style.findText}>Password</span>

                            </div>
                        </div>

                    </div>
                    <div className={style.buttonsWrapper}>
                        <button className={style.loginButton} onClick={handleSignup}>
                            Sign in
                        </button>
                        <div className={style.imgWrapper}>
                            <div className={style.googleImg}></div>
                            <div className={style.kakaoImg}></div>

                        </div>
                    </div>

                    <div className={style.signupWrapper}>
                        <span className={style.text}>
                            First time here? Sign up now
                        </span>
                        <div className={style.buttonsWrapper}>
                            <button className={style.signupButton}>
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}