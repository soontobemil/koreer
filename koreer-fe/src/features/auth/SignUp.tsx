import React, { useState, useCallback, ChangeEvent } from 'react';
import { Box, Stack, Button, Typography } from '@mui/material';
import { useSignUpValidator } from "./hooks/useSignUpValidator";
import { UserPostDTO, ValidateStatus } from "../../types/signup";
import { useSignUpMutation } from "./hooks/useSignUpMutation";
import { motion } from 'framer-motion';
import { IdField } from '../../components/shared/forms/IdField';
import { PasswordField } from '../../components/shared/forms/PasswordField';
import { NicknameField } from '../../components/shared/forms/NicknameField';
import { PasswordConfirmField } from '../../components/shared/forms/PasswordConfirmField';
import { ConfirmModal } from '../../components/shared/modals/ConfirmModal';

export function SignUp() {
  const [id, setId] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nation, setNation] = useState("korea");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const {
    idValidate,
    setIdValidate,
    nickNameValidate,
    setNickNameValidate,
    passwordValidate,
    setPasswordValidate,
    passwordCheckValidate,
    setPasswordCheckValidate,
  } = useSignUpValidator({
    id,
    nickName,
    password,
    passwordCheck,
    nation,
  });

  const handleSignup = useCallback(async () => {
    try {
      if (
        idValidate !== ValidateStatus.NONE ||
        nickNameValidate !== ValidateStatus.NONE ||
        passwordValidate !== ValidateStatus.NONE ||
        passwordCheckValidate !== ValidateStatus.NONE
      ) {
        return;
      }

      await useSignUpMutation({
        id,
        nickName,
        password,
        nation,
      });
      setSignUpSuccess(true);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  }, [id, nickName, password, nation, idValidate, nickNameValidate, passwordValidate, passwordCheckValidate]);

  const handleOpenDialog = () => setOpenCancelDialog(true);
  const handleCloseDialog = () => setOpenCancelDialog(false);
  const handleConfirmCancel = () => {
    handleCloseDialog();
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 3,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          mt: 3,
        }}
      >
        <form onSubmit={(e) => { e.preventDefault(); handleSignup(); }}>
          <Stack spacing={2}>
            <Typography variant="h5" align="center" gutterBottom>
              회원가입
            </Typography>

            <Stack spacing={2}>
              <IdField
                value={id}
                onChange={(e) => setId(e.target.value)}
                error={idValidate !== ValidateStatus.NONE}
                helperText={idValidate !== ValidateStatus.NONE ? "이메일을 다시 확인해주세요." : ""}
              />

              <NicknameField
                value={nickName}
                onChange={(e) => setNickName(e.target.value)}
                error={nickNameValidate !== ValidateStatus.NONE}
                helperText={nickNameValidate !== ValidateStatus.NONE ? "닉네임은 4~16자로 입력해주세요." : ""}
              />

              <PasswordField
                label="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={passwordValidate !== ValidateStatus.NONE}
                helperText={passwordValidate !== ValidateStatus.NONE ? "비밀번호는 4자 이상이어야 합니다." : ""}
              />

              <PasswordConfirmField
                value={passwordCheck}
                onChange={(e) => setPasswordCheck(e.target.value)}
                error={passwordCheckValidate !== ValidateStatus.NONE}
                helperText={
                  passwordCheckValidate === ValidateStatus.INVALID
                    ? "비밀번호가 일치하지 않습니다."
                    : passwordCheckValidate === ValidateStatus.BELOW_REQUIRED_LENGTH
                    ? "비밀번호는 4자 이상이어야 합니다."
                    : ""
                }
                password={password}
              />
            </Stack>

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                fullWidth
                onClick={handleOpenDialog}
              >
                취소
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={handleSignup}
                disabled={
                  idValidate !== ValidateStatus.NONE ||
                  nickNameValidate !== ValidateStatus.NONE ||
                  passwordValidate !== ValidateStatus.NONE ||
                  passwordCheckValidate !== ValidateStatus.NONE
                }
              >
                가입하기
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>

      <ConfirmModal
        open={openCancelDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmCancel}
        title="회원가입 취소"
        content="회원가입을 취소하시겠습니까? 입력하신 정보는 저장되지 않습니다."
      />
    </Box>
  );
}
