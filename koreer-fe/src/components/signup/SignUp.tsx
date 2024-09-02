import style from "../../assets/scss/sub/signup.module.scss"
import {SignUpIdField} from "./SignUpIdField";
import {SignUpPasswordField} from "./SignUpPasswordField";
import {SignUpPasswordConfirmField} from "./SignUpPasswordConfirmField";
import {SignUpNicknameField} from "./SignUpNicknameField";
import {SignUpNationField} from "./SignUpNationField";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function SignUp() {
    const [nation, setNation] = useState('Select your country!');
    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('')
    const navigate = useNavigate()

    const handleCancelButton = () =>{
        // eslint-disable-next-line no-restricted-globals
        const confirms = confirm('Are you sure you want to cancel?\nAny unsaved changes will be lost')
        if (confirms) {
            navigate('/signin');
        }
    }

    const handleSignup = () =>{

    }
    return(
        <>
            <div className={style.signupMainWrapper}>
                <div className={style.signupWrapper}>
                    <div className={style.header}>
                        Sign Up
                    </div>

                    <div className={style.body}>
                        <SignUpNationField nation={nation} setNation={setNation} />

                        <SignUpIdField id={id} setId={setId}/>

                        <SignUpNicknameField nickName={nickName} setNickName={setNickName} />

                        <SignUpPasswordField password={password} setPassword={setPassword} />

                        <SignUpPasswordConfirmField passwordCheck={passwordCheck} setPasswordCheck={setPasswordCheck} />
                        <div className={style.buttonsWrapper}>
                            <div className={style.cancelButton} onClick={handleCancelButton}>
                                Cancel
                            </div>
                            <div className={style.signupButton}>
                                Sign Up
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}