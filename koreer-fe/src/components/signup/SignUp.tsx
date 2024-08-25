import style from "../../assets/scss/sub/signup.module.scss"
import {SignUpIdField} from "./SignUpIdField";
import {SignUpPasswordField} from "./SignUpPasswordField";
import {SignUpPasswordConfirmField} from "./SignUpPasswordConfirmField";
import {SignUpNicknameField} from "./SignUpNicknameField";
import {SignUpNationField} from "./SignUpNationField";

export function SignUp() {

    return(
        <>
            <div className={style.signupMainWrapper}>
                <div className={style.signupWrapper}>
                    <div className={style.header}>
                        Sign Up
                    </div>

                    <div className={style.body}>
                        <SignUpNationField />

                        <SignUpIdField />

                        <SignUpNicknameField />

                        <SignUpPasswordField />

                        <SignUpPasswordConfirmField />
                    </div>

                </div>

            </div>
        </>
    )
}