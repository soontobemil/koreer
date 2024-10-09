import {executePromise} from "../util/sliceUtil";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SignInApi} from "../api/SignInApi";
import {LoginDTO} from "../types/signIn";

export const login = createAsyncThunk("auth/loign",
    (user: LoginDTO) => executePromise(SignInApi.loginUser(user))
);
