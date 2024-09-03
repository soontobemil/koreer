import {executePromise} from "../util/sliceUtil";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SignupApi} from "../api/SignupApi";
import {UserPostDTO} from "../types/signup";

export const createUser = createAsyncThunk("user/createUser",
    (user: UserPostDTO) => executePromise(SignupApi.createUser(user))
);
export const duplicateCheck = createAsyncThunk("user/duplicateCheck", (email: string) =>
    executePromise(SignupApi.duplicateCheck(email))
);
