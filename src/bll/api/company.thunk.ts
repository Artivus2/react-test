import { createAsyncThunk } from "@reduxjs/toolkit";
import { CompanyService } from "../../services/CompanyService";
import { CreateCompanyRequest, ICompany } from "../../types/Company.type";
import { errorProcessing } from "../../utils/fn/errorProcessing";

export const findCompanyByINNThunk = createAsyncThunk(
    'company/find',
    async (inn: string) => {
        try {
            const { data } = await CompanyService.findCompanyByINN(inn);
            return data as ICompany;
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const getAllCompaniesThunk = createAsyncThunk(
    'company/list',
    async () => {
        try {
            const { data } = await CompanyService.getAllCompanies();
            return data as ICompany[];
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);

export const createCompanyThunk = createAsyncThunk(
    'company/create',
    async (requestData: CreateCompanyRequest) => {
        try {
            const data = await CompanyService.createCompany(requestData);
            return data;
        } catch (e) {
            const message = errorProcessing(e);
            // MUST be FIX
            // alert(message);
        }
    }
);