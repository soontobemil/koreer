import React from 'react';
import {
  TextField,
  InputAdornment,
} from '@mui/material';
import { Email } from '@mui/icons-material';
import { ValidateStatus } from '../../types/signup';

interface Args {
  id: string;
  setId: (id: string) => void;
  idValidate: ValidateStatus;
  setIdValidate: React.Dispatch<React.SetStateAction<ValidateStatus>>;
}

export function SignUpIdField({
  id,
  setId,
  idValidate,
  setIdValidate,
}: Args) {
  const [dupleMessage, setDupleMessage] = React.useState('');

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setId(value);
    setIdValidate(ValidateStatus.UNFILLED);
    setDupleMessage('');
  };

  const isError = idValidate !== ValidateStatus.NONE && id !== '';

  return (
    <TextField
      fullWidth
      label="이메일"
      variant="outlined"
      value={id}
      onChange={handleIdChange}
      error={isError}
      helperText={dupleMessage}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Email />
          </InputAdornment>
        ),
      }}
    />
  );
}
