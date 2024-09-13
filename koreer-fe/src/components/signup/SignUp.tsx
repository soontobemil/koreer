import style from "../../assets/scss/sub/signup.module.scss"
import {SignUpIdField} from "./SignUpIdField";
import {SignUpPasswordField} from "./SignUpPasswordField";
import {SignUpPasswordConfirmField} from "./SignUpPasswordConfirmField";
import {SignUpNicknameField} from "./SignUpNicknameField";
import {SignUpNationField} from "./SignUpNationField";
import {useCallback, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createUser} from "../../slice/signupSlice";
import {UserPostDTO} from "../../types/signup";

export function SignUp() {
    console.log(123)
    const [nation, setNation] = useState('Select your country!');
    const [id, setId] = useState('');
    const [nickName, setNickName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch<any>();

    const handleCancelButton = () =>{
        // eslint-disable-next-line no-restricted-globals
        const confirms = confirm('Are you sure you want to cancel?\nAny unsaved changes will be lost')
        if (confirms) {
            navigate('/signin');
        }
    }

    const handleSignup = useCallback(async () => {
            const result:any = await dispatch(
                createUser({
                    id: id,
                    nation: nation,
                    nickName: nickName,
                    password:password
                }as UserPostDTO)
            ).unwrap();
            console.log(result)
        },
        [id, nation,  nickName, password]);


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
                            <div className={style.signupButton} onClick={handleSignup}>
                                Sign Up
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}