import { useState, useCallback } from 'react';
import { ValidateStatus } from '../../../types/signup';

interface Args {
  nation: string;
  id: string;
  nickName: string;
  password: string;
  passwordCheck: string;
}

export function useSignUpValidator({
  nation,
  id,
  nickName,
  password,
  passwordCheck,
}: Args) {
  const [nationValidate, setNationValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [idValidate, setIdValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [nickNameValidate, setNickNameValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [passwordValidate, setPasswordValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [passwordCheckValidate, setPasswordCheckValidate] = useState<ValidateStatus>(ValidateStatus.NONE);

  const validate = useCallback(() => {
    let isValidate = true;

    if (nation === '국가를 선택해주세요!') {
      setNationValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    if (id.length === 0) {
      setIdValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValidate = false;
    }

    if (nickName.length < 4 || nickName.length > 16) {
      setNickNameValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValidate = false;
    }

    if (password.length < 4) {
      setPasswordValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValidate = false;
    }

    if (passwordCheck.length < 4) {
      setPasswordCheckValidate(ValidateStatus.BELOW_REQUIRED_LENGTH);
      isValidate = false;
    }

    if (password !== passwordCheck) {
      setPasswordCheckValidate(ValidateStatus.INVALID);
      isValidate = false;
    }

    return isValidate;
  }, [nation, id, nickName, password, passwordCheck]);

  return {
    nationValidate,
    setNationValidate,
    idValidate,
    setIdValidate,
    nickNameValidate,
    setNickNameValidate,
    passwordValidate,
    setPasswordValidate,
    passwordCheckValidate,
    setPasswordCheckValidate,
    validate,
  };
}