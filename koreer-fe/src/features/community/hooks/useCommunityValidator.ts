import {useState, useCallback} from 'react';
import {ValidateStatus} from '../../../types/signup';

interface Args {
  title: string;
  content: string;
  category?: string;
}

export function useCommunityValidator({title, content, category}: Args) {
  const [titleValidate, setTitleValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [contentValidate, setContentValidate] = useState<ValidateStatus>(ValidateStatus.NONE);
  const [categoryValidate, setCategoryValidate] = useState<ValidateStatus>(ValidateStatus.NONE);

  const validate = useCallback(() => {
    let isValidate = true;

    if (title === '' || title.length >= 100) {
      setTitleValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    if (content === '' || content.length >= 300) {
      setContentValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    if (category === undefined) {
      setCategoryValidate(ValidateStatus.UNFILLED);
      isValidate = false;
    }

    return isValidate;
  }, [title, content, category]);

  return {
    titleValidate,
    setTitleValidate,
    contentValidate,
    setContentValidate,
    categoryValidate,
    setCategoryValidate,
    validate,
  };
}