import {executePromise} from "../util/sliceUtil";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {SignupApi} from "../api/SignupApi";
import {UserPostDTO} from "../types/signup";
import {TipsApi} from "../api/TipsApi";

export const getTips = createAsyncThunk("tips/getTips",
    () => executePromise(TipsApi.getTips())
);
