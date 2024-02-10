import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICompany} from "../../types/Company.type";
import {getAllCompaniesThunk} from "../api/company.thunk";
import {log} from "util";

interface CompanyState {
    isFetching: boolean;
    list: ICompany[];
    error: string;
}

const initialState: CompanyState = {
    isFetching: false,
    list: [],
    error: '',
};

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {

        // setSelectedCompany: (state, action: PayloadAction<ICompany | null>) => {
        //     state.selectedCompany = action.payload;
        // }

    },
    extraReducers: {
        [getAllCompaniesThunk.pending.type]: (state) => {
            state.isFetching = true;
            state.error = '';
        },
        [getAllCompaniesThunk.fulfilled.type]: (state, action: PayloadAction<ICompany[]>) => {
            state.list = action.payload;
            state.isFetching = false;
        },
        [getAllCompaniesThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isFetching = false;
        },
    }
});

export const {

} = companySlice.actions;