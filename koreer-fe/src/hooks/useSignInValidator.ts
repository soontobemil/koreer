import { useState } from 'react';

interface SignInValidation {
    validate: boolean;
    emailValidate: boolean;
    setEmailValidate: (validate: boolean) => void;
    passwordValidate: boolean;
    setPasswordValidate: (validate: boolean) => void;
}

export function useSignInValidator({ email, password }: { email: string; password: string }): SignInValidation {
    const [emailValidate, setEmailValidate] = useState(false);
    const [passwordValidate, setPasswordValidate] = useState(false);

    const validate = emailValidate && passwordValidate;

    return {
        validate,
        emailValidate,
        setEmailValidate,
        passwordValidate,
        setPasswordValidate,
    };
}
