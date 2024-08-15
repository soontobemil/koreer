import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {executePromise} from "../util/sliceUtil";
import {CompanyInformationApi} from "../api/CompanyInformationApi";
import {CompanyInformationDTO} from "../types/companyInformation";

export const getCompanyInformation = createAsyncThunk("order/getCompanyInformation",
    ({ country, location }: { country: string; location: string }) =>
        executePromise<CompanyInformationDTO[]>(CompanyInformationApi.getCompanyLists(country, location))
);

const initialState = {
    isApiCalled: true,
    test: "TEST",
};

export const companyInformationSlice = createSlice({
    name: "emoji",
    initialState,
    reducers: {
        emoji: (state, action: PayloadAction<boolean>) => {
            state.isApiCalled = action.payload;
        },
    },
    extraReducers: (builder) => {
    },
});

export const { emoji } = companyInformationSlice.actions;
export default companyInformationSlice.reducer;