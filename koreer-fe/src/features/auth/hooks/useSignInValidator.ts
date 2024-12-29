import { useState, useCallback } from 'react';
import { ValidateStatus } from '../../../types/signup';

interface Args {
  email: string;
  password: string;
}

export function useSignInValidator({ email, password }: Args) {
  const [emailValidate, setEmailValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [passwordValidate, setPasswordValidate] = useState<ValidateStatus>(ValidateStatus.NONE);

  const validate = useCallback(() => {
    let result = true;

    if (email.length === 0) {
      setEmailValidate(ValidateStatus.UNFILLED);
      result = false;
    }

    if (password.length === 0) {
      setPasswordValidate(ValidateStatus.UNFILLED);
      result = false;
    }

    return result;
  }, [email, password]);

  return {
    emailValidate,
    setEmailValidate,
    passwordValidate,
    setPasswordValidate,
    validate,
  };
}